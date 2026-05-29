export default function Insights() {
  const edges = [
    { player: "Nikola Jokic", stat: "Over 26.5 Points", edge: "+12.4%", matchup: "DEN @ MIN" },
    { player: "Luka Doncic", stat: "Over 8.5 Assists", edge: "+9.7%", matchup: "DAL @ OKC" },
    { player: "Boston Celtics", stat: "-4.5 Spread", edge: "+8.3%", matchup: "BOS @ IND" },
    { player: "SGP: 2+ MLB Legs", stat: "Parlay", edge: "+7.6%", matchup: "Multiple Games" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold text-zinc-400 tracking-wider">TOP AI EDGE</h3>
        <a href="/insights" className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
          View All
        </a>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {edges.map((edge, i) => (
          <div 
            key={i} 
            className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-all duration-200 cursor-pointer group border border-transparent hover:border-zinc-700"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-semibold text-emerald-400">
                {edge.player}
              </p>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                {edge.edge}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-1">{edge.stat}</p>
            <p className="text-[10px] text-zinc-600 font-medium">{edge.matchup}</p>
          </div>
        ))}
      </div>
    </div>
  );
}