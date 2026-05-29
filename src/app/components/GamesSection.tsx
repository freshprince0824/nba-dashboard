"use client";

import { useState, useEffect } from "react";
import { getTeamLogo } from "@/lib/teamLogos";

const sports = [
  { key: "all", label: "All" },
  { key: "basketball_nba", label: "NBA" },
  { key: "baseball_mlb", label: "MLB" },
  { key: "americanfootball_nfl", label: "NFL" },
  { key: "icehockey_nhl", label: "NHL" },
];

async function getLiveGames(sport: string) {
  const res = await fetch(`/api/games?sport=${sport}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch");
  }
  return res.json();
}

export default function GamesSection() {
  const [activeSport, setActiveSport] = useState("all");
  const [allGames, setAllGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllGames() {
      try {
        setLoading(true);
        const [nba, mlb, nfl, nhl] = await Promise.all([
          getLiveGames("basketball_nba"),
          getLiveGames("baseball_mlb"),
          getLiveGames("americanfootball_nfl"),
          getLiveGames("icehockey_nhl"),
        ]);

        const combined = [
          ...nba.map((g: any) => ({ ...g, sportKey: "basketball_nba" })),
          ...mlb.map((g: any) => ({ ...g, sportKey: "baseball_mlb" })),
          ...nfl.map((g: any) => ({ ...g, sportKey: "americanfootball_nfl" })),
          ...nhl.map((g: any) => ({ ...g, sportKey: "icehockey_nhl" })),
        ];

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todaysGames = combined.filter((game: any) => {
          const gameDate = new Date(game.commence_time);
          return gameDate >= today && gameDate < tomorrow;
        });

        setAllGames(todaysGames);
      } catch (err) {
        console.error("Error loading games:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAllGames();
  }, []);

  const filteredGames = activeSport === "all" 
    ? allGames 
    : allGames.filter((g: any) => g.sportKey === activeSport);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col overflow-hidden h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">games today</h3>
          <div className="flex gap-1">
            {sports.map((sport) => (
              <button
                key={sport.key}
                onClick={() => setActiveSport(sport.key)}
                className={`text-[10px] px-2 py-1 rounded transition-colors ${
                  activeSport === sport.key
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {sport.label}
              </button>
            ))}
          </div>
        </div>
        <span className="text-[10px] text-zinc-600">{filteredGames.length} games</span>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 space-y-2">
        {loading ? (
          <div className="text-zinc-500 p-4">Loading games...</div>
        ) : filteredGames.length === 0 ? (
          <div className="text-zinc-500 p-4">No games today</div>
        ) : (
          filteredGames.map((game: any) => {
            const bookmaker = game.bookmakers?.[0];
            const h2h = bookmaker?.markets?.find((m: any) => m.key === "h2h");
            const spreads = bookmaker?.markets?.find((m: any) => m.key === "spreads");
            const totals = bookmaker?.markets?.find((m: any) => m.key === "totals");

            const homeH2h = h2h?.outcomes?.find((o: any) => o.name === game.home_team);
            const awayH2h = h2h?.outcomes?.find((o: any) => o.name === game.away_team);
            
            const homeSpread = spreads?.outcomes?.find((o: any) => o.name === game.home_team);
            const awaySpread = spreads?.outcomes?.find((o: any) => o.name === game.away_team);
            
            const overTotal = totals?.outcomes?.find((o: any) => o.name === "Over");
            const underTotal = totals?.outcomes?.find((o: any) => o.name === "Under");

            return (
              <div key={game.id} className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors border border-zinc-700/50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-emerald-400 font-medium">
                    {new Date(game.commence_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-xs text-emerald-500 font-bold">
                    {sports.find(s => s.key === game.sportKey)?.label}
                  </span>
                </div>

                {/* Header Labels - THINNER */}
                <div className="grid grid-cols-[1fr_50px_50px_50px] gap-1 mb-2 text-xs text-zinc-500">
                  <div></div>
                  <div className="text-center">Spread</div>
                  <div className="text-center">Total</div>
                  <div className="text-center">ML</div>
                </div>

                {/* Away Team - THINNER */}
                <div className="grid grid-cols-[1fr_50px_50px_50px] gap-1 items-center mb-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src={getTeamLogo(game.away_team, game.sportKey)} 
                      alt=""
                      className="w-5 h-5 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <p className="text-white font-semibold text-sm">{game.away_team}</p>
                  </div>
                  <button className="px-1 py-1 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
                    <span className="block">{awaySpread?.point > 0 ? `+${awaySpread.point}` : awaySpread?.point || "-"}</span>
                    <span className="block text-zinc-500 text-[10px]">{awaySpread?.price || ""}</span>
                  </button>
                  <button className="px-1 py-1 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
                    <span className="block">O{overTotal?.point || "-"}</span>
                    <span className="block text-zinc-500 text-[10px]">{overTotal?.price || ""}</span>
                  </button>
                  <button className="px-1 py-1 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
                    {awayH2h?.price > 0 ? `+${awayH2h.price}` : awayH2h?.price || "-"}
                  </button>
                </div>

                {/* Home Team - THINNER */}
                <div className="grid grid-cols-[1fr_50px_50px_50px] gap-1 items-center">
                  <div className="flex items-center gap-2">
                    <img 
                      src={getTeamLogo(game.home_team, game.sportKey)} 
                      alt=""
                      className="w-5 h-5 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <p className="text-zinc-400 text-sm">{game.home_team}</p>
                  </div>
                  <button className="px-1 py-1 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
                    <span className="block">{homeSpread?.point > 0 ? `+${homeSpread.point}` : homeSpread?.point || "-"}</span>
                    <span className="block text-zinc-500 text-[10px]">{homeSpread?.price || ""}</span>
                  </button>
                  <button className="px-1 py-1 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
                    <span className="block">U{underTotal?.point || "-"}</span>
                    <span className="block text-zinc-500 text-[10px]">{underTotal?.price || ""}</span>
                  </button>
                  <button className="px-1 py-1 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
                    {homeH2h?.price > 0 ? `+${homeH2h.price}` : homeH2h?.price || "-"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}