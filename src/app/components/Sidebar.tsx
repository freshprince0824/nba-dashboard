"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "dashboard", href: "/" },
  { name: "games", href: "/games" },
  { name: "bet tracker", href: "/bet-tracker" },
  { name: "insights", href: "/insights" },
  { name: "props", href: "/props" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-4 flex flex-col">
      <Link href="/" className="mb-8 px-2 hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold text-white">sporty</h1>
      </Link>
      
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}