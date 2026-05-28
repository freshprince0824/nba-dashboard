export default function GameCard({ game }: { game: any }) {
  const home = game.competitions?.[0]?.competitors?.find((c: any) => c.homeAway === "home");
  const away = game.competitions?.[0]?.competitors?.find((c: any) => c.homeAway === "away");
  
  if (!home || !away) return null;
  
  const status = game.status?.type?.description || "upcoming";
  const isLive = game.status?.type?.state === "in";
  const isFinal = status === "final";
  
  const awayLogo = away.team?.logo || `https://a.espncdn.com/i/teamlogos/nba/500/${away.team?.abbreviation?.toLowerCase()}.png`;
  const homeLogo = home.team?.logo || `https://a.espncdn.com/i/teamlogos/nba/500/${home.team?.abbreviation?.toLowerCase()}.png`;
  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-semibold uppercase tracking-wider ${
          isFinal ? "text-emerald-400" : isLive ? "text-amber-400" : "text-zinc-500"
        }`}>
          {isLive ? "● live" : isFinal ? "final" : "8:30 pm et"}
        </span>
        <span className="text-xs text-zinc-600">{game.date?.slice(0, 10)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img 
              src={awayLogo} 
              alt={away.team?.displayName || "away"}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{away.team?.displayName || "unknown"}</p>
            <p className="text-2xl font-bold text-white">{away.score || "-"}</p>
          </div>
        </div>
        
        <div className="text-zinc-600 text-sm px-4">@</div>
        
        <div className="flex items-center gap-3 flex-1 flex-row-reverse">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img 
              src={homeLogo} 
              alt={home.team?.displayName || "home"}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-right">
            <p className="font-semibold text-white text-sm">{home.team?.displayName || "unknown"}</p>
            <p className="text-2xl font-bold text-white">{home.score || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}