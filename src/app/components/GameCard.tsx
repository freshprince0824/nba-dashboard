{filteredGames.map((game: any) => {
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

      <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 mb-2 text-xs text-zinc-500">
        <div></div>
        <div className="text-center">Spread</div>
        <div className="text-center">Total</div>
        <div className="text-center">ML</div>
      </div>

      {/* Away Team */}
      <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 items-center mb-2">
        <div className="flex items-center gap-2">
          <img 
            src={getTeamLogo(game.away_team, game.sportKey)} 
            alt=""
            className="w-5 h-5 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <p className="text-white font-semibold text-sm">{game.away_team}</p>
        </div>
        <button className="px-2 py-2 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
          <span className="block">{awaySpread?.point > 0 ? `+${awaySpread.point}` : awaySpread?.point || "-"}</span>
          <span className="block text-zinc-500 text-[10px]">{awaySpread?.price || ""}</span>
        </button>
        <button className="px-2 py-2 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
          <span className="block">O{overTotal?.point || "-"}</span>
          <span className="block text-zinc-500 text-[10px]">{overTotal?.price || ""}</span>
        </button>
        <button className="px-2 py-2 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
          {awayH2h?.price > 0 ? `+${awayH2h.price}` : awayH2h?.price || "-"}
        </button>
      </div>

      {/* Home Team */}
      <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 items-center">
        <div className="flex items-center gap-2">
          <img 
            src={getTeamLogo(game.home_team, game.sportKey)} 
            alt=""
            className="w-5 h-5 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <p className="text-zinc-400 text-sm">{game.home_team}</p>
        </div>
        <button className="px-2 py-2 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
          <span className="block">{homeSpread?.point > 0 ? `+${homeSpread.point}` : homeSpread?.point || "-"}</span>
          <span className="block text-zinc-500 text-[10px]">{homeSpread?.price || ""}</span>
        </button>
        <button className="px-2 py-2 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
          <span className="block">U{underTotal?.point || "-"}</span>
          <span className="block text-zinc-500 text-[10px]">{underTotal?.price || ""}</span>
        </button>
        <button className="px-2 py-2 rounded-lg bg-zinc-700 hover:bg-emerald-500/20 text-xs text-zinc-300 hover:text-emerald-400 transition-all text-center border border-zinc-600 hover:border-emerald-500/30">
          {homeH2h?.price > 0 ? `+${homeH2h.price}` : homeH2h?.price || "-"}
        </button>
      </div>
    </div>
  );
})}