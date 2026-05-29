export async function getLiveGames() {
  const res = await fetch("/api/games", {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}