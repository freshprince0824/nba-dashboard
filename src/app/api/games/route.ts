import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport") || "basketball_nba";

  try {
    const apiKey = process.env.ODDS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sport}/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`,
      { next: { revalidate: 60 } }
    );
    
    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: 500 });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}