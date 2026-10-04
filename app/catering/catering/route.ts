import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();

    if (!data.name || !data.email || !data.date || !data.guests) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("New catering request:", data);

    return NextResponse.json({ ok: true });
}