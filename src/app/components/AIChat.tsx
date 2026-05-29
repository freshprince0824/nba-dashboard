"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I analyzed 12 games today. Found 3 strong edges. What can I help you with?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "Analyzing your pick... This looks +EV based on recent trends." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
              msg.role === "user" ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-300"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask anything..."
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={sendMessage}
          className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg p-2.5 transition-colors flex items-center justify-center"
          title="Send"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}