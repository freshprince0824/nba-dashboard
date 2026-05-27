export default function Insights() {
  const edges = [
    { player: "nikola jokic", stat: "over 26.5 points", edge: "+12.4%", matchup: "den @ min" },
    { player: "luka doncic", stat: "over 8.5 assists", edge: "+9.7%", matchup: "dal @ okc" },
    { player: "boston celtics", stat: "-4.5 spread", edge: "+8.3%", matchup: "bos @ ind" },
    { player: "sgp: 2+ mlb legs", stat: "parlay", edge: "+7.6%", matchup: "multiple games" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">top ai edge</h3>
        <a href="/insights" className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors">view all</a>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {edges.map((edge, i) => (
          <div key={i} className="bg-zinc-800/50 rounded-lg p-3 hover:bg-zinc-800 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium text-white">{edge.player}</p>
              <span className="text-xs text-emerald-400 font-medium">{edge.edge}</span>
            </div>
            <p className="text-xs text-zinc-500 mb-1">{edge.stat}</p>
            <p className="text-[10px] text-zinc-600">{edge.matchup}</p>
          </div>
        ))}
      </div>
    </div>
  );
}