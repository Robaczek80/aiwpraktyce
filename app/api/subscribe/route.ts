import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "EMAIL_REQUIRED" }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "MISSING_API_KEY" }, { status: 500 })
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ ok: false, error: "BREVO_ERROR", detail: text }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 })
  }
}
