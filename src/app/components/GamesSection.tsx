"use client";

import { useState, useEffect } from "react";
import { getTeamLogo } from "@/lib/teamLogos";

interface Game {
  id: string;
  sportKey: string;
  away_team: string;
  home_team: string;
  commence_time: string;
  home_score?: string;
  away_score?: string;
  status: string;
  status_code: string;
  bookmakers: any[];
}

const sports = [
  { key: "all", label: "All" },
  { key: "basketball_nba", label: "NBA" },
  { key: "baseball_mlb", label: "MLB" },
  { key: "americanfootball_nfl", label: "NFL" },
  { key: "icehockey_nhl", label: "NHL" },
];

export default function GamesSection() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState("all");

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Failed to fetch games", err);
      } finally {
        setLoading(false);
      }
    }
    
    // Fetch immediately
    fetchGames();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchGames, 30000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const filteredGames =
    activeSport === "all"
      ? games
      : games.filter((g) => g.sportKey === activeSport);

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function isLive(statusCode: string) {
    return statusCode === "STATUS_IN_PROGRESS";
  }

  function isFinal(statusCode: string) {
    return statusCode === "STATUS_FINAL";
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Games Today
          </h2>
          <div className="flex gap-1">
            {sports.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSport(s.key)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  activeSport === s.key
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <span className="text-xs text-zinc-600">
          {filteredGames.length} games
        </span>
      </div>

      {/* Games List */}
      <div className="divide-y divide-zinc-800">
        {filteredGames.map((game) => {
          return (
            <div key={game.id} className="p-5">
              {/* Game Header - Time, Status & Sport */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-emerald-400">
                    {formatTime(game.commence_time)}
                  </span>
                  {isLive(game.status_code) && (
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded animate-pulse">
                      LIVE
                    </span>
                  )}
                  {isFinal(game.status_code) && (
                    <span className="text-[10px] bg-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded">
                      FINAL
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-emerald-400">
                  {sports.find((s) => s.key === game.sportKey)?.label || "MLB"}
                </span>
              </div>

              {/* ===== AWAY TEAM ROW ===== */}
              <div className="mb-3 flex items-center gap-3">
                {/* Team Info + Score */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={getTeamLogo(game.away_team, game.sportKey)}
                    alt={game.away_team}
                    className="h-8 w-8 flex-shrink-0 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://a.espncdn.com/i/teamlogos/default-team-logo-500.png";
                    }}
                  />
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="truncate text-base font-semibold text-white">
                      {game.away_team}
                    </p>
                    {game.away_score !== undefined && game.away_score !== null && (
                      <span className={`text-lg font-bold ${
                        isFinal(game.status_code) ? "text-zinc-400" : "text-emerald-400"
                      }`}>
                        {game.away_score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Odds - Right Side */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-3 min-w-[90px]">
                    <span className="text-base font-bold text-white">-</span>
                    <span className="text-sm text-zinc-500">-</span>
                  </button>
                  <button className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-3 min-w-[90px]">
                    <span className="text-base font-bold text-white">-</span>
                    <span className="text-sm text-zinc-500">-</span>
                  </button>
                  <button className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-3 min-w-[90px]">
                    <span className="text-base font-bold text-white">-</span>
                  </button>
                </div>
              </div>

              {/* ===== HOME TEAM ROW ===== */}
              <div className="flex items-center gap-3">
                {/* Team Info + Score */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={getTeamLogo(game.home_team, game.sportKey)}
                    alt={game.home_team}
                    className="h-8 w-8 flex-shrink-0 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://a.espncdn.com/i/teamlogos/default-team-logo-500.png";
                    }}
                  />
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="truncate text-base font-semibold text-zinc-400">
                      {game.home_team}
                    </p>
                    {game.home_score !== undefined && game.home_score !== null && (
                      <span className={`text-lg font-bold ${
                        isFinal(game.status_code) ? "text-zinc-400" : "text-emerald-400"
                      }`}>
                        {game.home_score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Odds - Right Side */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-3 min-w-[90px]">
                    <span className="text-base font-bold text-white">-</span>
                    <span className="text-sm text-zinc-500">-</span>
                  </button>
                  <button className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-3 min-w-[90px]">
                    <span className="text-base font-bold text-white">-</span>
                    <span className="text-sm text-zinc-500">-</span>
                  </button>
                  <button className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 px-5 py-3 min-w-[90px]">
                    <span className="text-base font-bold text-white">-</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGames.length === 0 && (
        <div className="py-12 text-center text-zinc-500">
          No games found for this sport.
        </div>
      )}
    </div>
  );
}