import { NextResponse } from "next/server";

const ESPN_SPORTS: Record<string, string> = {
  basketball_nba: "basketball/nba",
  baseball_mlb: "baseball/mlb",
  icehockey_nhl: "hockey/nhl",
  // NO NFL - out of season
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport");

  const allGames: any[] = [];

  const sportsToFetch = sport && ESPN_SPORTS[sport] 
    ? [[sport, ESPN_SPORTS[sport]]] 
    : Object.entries(ESPN_SPORTS);

  for (const [sportKey, espnPath] of sportsToFetch) {
    try {
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/${espnPath}/scoreboard?limit=100`
      );
      
      if (!res.ok) continue;
      
      const data = await res.json();
      
      // Show ALL events ESPN returns (no date filter)
      for (const event of data.events || []) {
        const homeTeam = event.competitions[0]?.competitors?.find((c: any) => c.homeAway === "home")?.team?.displayName;
        const awayTeam = event.competitions[0]?.competitors?.find((c: any) => c.homeAway === "away")?.team?.displayName;
        
        allGames.push({
          id: event.id,
          sportKey: sportKey,
          home_team: homeTeam,
          away_team: awayTeam,
          commence_time: event.date,
          home_score: event.competitions[0]?.competitors?.find((c: any) => c.homeAway === "home")?.score,
          away_score: event.competitions[0]?.competitors?.find((c: any) => c.homeAway === "away")?.score,
          status: event.status?.type?.description,
          status_code: event.status?.type?.name,
          bookmakers: [],
        });
      }
    } catch (err) {
      console.error(`Failed to fetch ESPN ${sportKey}:`, err);
    }
  }

  return NextResponse.json(allGames);
}