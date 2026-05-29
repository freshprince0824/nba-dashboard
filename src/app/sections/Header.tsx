"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, Settings, X } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("user"); // Change this to your name

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    let text = "";
    
    // Customize these messages however you want
    if (hour >= 5 && hour < 12) {
      text = "good morning";           // 5 AM - 11:59 AM
    } else if (hour >= 12 && hour < 17) {
      text = "good afternoon";         // 12 PM - 4:59 PM
    } else if (hour >= 17 && hour < 22) {
      text = "good evening";           // 5 PM - 9:59 PM
    } else {
      text = "goodnight";             // 10 PM - 4:59 AM
    }
    
    setGreeting(text);
  }, []);

  const searchSuggestions = [
    { type: "team", name: "Boston Celtics", icon: "☘️" },
    { type: "team", name: "Oklahoma City Thunder", icon: "🌩️" },
    { type: "player", name: "Nikola Jokic", icon: "⛏️" },
    { type: "player", name: "Luka Doncic", icon: "🪄" },
    { type: "game", name: "Thunder @ Spurs", icon: "🏀" },
    { type: "game", name: "Celtics @ Pacers", icon: "🏀" },
  ];

  const filteredSuggestions = searchQuery.length > 0
    ? searchSuggestions.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 py-4">
      <div className="w-full px-6 flex items-center justify-between">
        {/* Left: Greeting */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-white capitalize">
            {greeting}, <span className="text-emerald-400">{userName}</span>
          </h1>
          
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-64">
            <div className={`flex items-center gap-3 bg-zinc-900 border rounded-xl px-4 py-2.5 transition-all duration-200 ${
              isSearchFocused ? "border-emerald-500/50 shadow-sm shadow-emerald-500/10" : "border-zinc-800"
            }`}>
              <Search size={16} className="text-zinc-500" />
              <input
                type="text"
                placeholder="Search teams, players, games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-zinc-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {isSearchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl z-50">
                {filteredSuggestions.map((item, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-sm text-white">{item.name}</p>
                      <p className="text-xs text-zinc-500 capitalize">{item.type}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <nav className="flex gap-2 text-sm items-center">
            <button className="p-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white" title="notifications">
              <Bell size={18} />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white" title="user profile">
              <User size={18} />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white" title="settings">
              <Settings size={18} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}