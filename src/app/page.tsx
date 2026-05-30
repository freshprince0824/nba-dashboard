import GameCard from "./components/GameCard";
import LineGraph from "./components/LineGraph";
import AIChat from "./components/AIChat";
import Insights from "./components/Insights";
import Header from "./sections/Header";
import GamesSection from "./components/GamesSection";

async function getGames() {
  try {
    const res = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("API error:", error);
    return { events: [] };
  }
}

export default async function Home() {
  const data = await getGames();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="p-4 h-[calc(100vh-64px)] overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto flex flex-col gap-4">
          
          {/* 4 Small Stat Cards */}
          <div className="flex gap-3 shrink-0">
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">games today</p>
              <p className="text-xl font-bold text-white mt-1">8</p>
              <p className="text-[10px] text-emerald-400 mt-1">+2 vs yesterday</p>
            </div>
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">my record</p>
              <p className="text-xl font-bold text-white mt-1">12-5</p>
              <p className="text-[10px] text-emerald-400 mt-1">70.6% win rate</p>
            </div>
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">current streak</p>
              <p className="text-xl font-bold text-white mt-1">3 wins</p>
              <p className="text-[10px] text-emerald-400 mt-1">3 in a row</p>
            </div>
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">units</p>
              <p className="text-xl font-bold text-white mt-1">+8.4u</p>
              <p className="text-[10px] text-emerald-400 mt-1">+2.1u this week</p>
            </div>
          </div>
          
          {/* 4 Big Cards - Left column wider, right column thinner */}
          <div className="grid grid-cols-[7fr_3fr] grid-rows-2 gap-4 flex-1 min-h-0">
            
            {/* Units Chart - Top Left (wider) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">units</h3>
                <div className="flex gap-1">
                  <button className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">7d</button>
                  <button className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded">30d</button>
                  <button className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">90d</button>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <LineGraph />
              </div>
            </div>
            
            {/* Top AI Edge - Top Right (thinner) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col overflow-hidden">
              <Insights />
            </div>
            
            {/* Games Today - Bottom Left (wider) - WITH SCROLLING */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
              <div className="flex-1 min-h-0 overflow-y-auto">
                <GamesSection />
              </div>
            </div>
            
            {/* AI Assistant - Bottom Right (thinner) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">ai assistant</h3>
                <span className="text-[10px] bg-emerald-600/20 text-emerald-400 px-1.5 py-0.5 rounded">beta</span>
              </div>
              <div className="flex-1 min-h-0">
                <AIChat />
              </div>
            </div>
            
          </div>
          
        </div>
      </main>
    </div>
  );
}