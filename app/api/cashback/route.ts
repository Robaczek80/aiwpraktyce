import { NextResponse } from "next/server"

function toCsvUrl(u: string) {
  const i = u.indexOf("/edit")
  return (i > 0 ? u.slice(0, i) : u).replace(/\/$/, "") + "/gviz/tq?tqx=out:csv"
}

export async function GET() {
  try {
    const sheetUrl = process.env.SHEET_CASHBACK_URL
    if (!sheetUrl) return NextResponse.json({ error: "SHEET_URL_MISSING" }, { status: 500 })
    const csvUrl = toCsvUrl(sheetUrl)

    const res = await fetch(csvUrl, { cache: "no-store" })
    const text = await res.text()

    const rows = text.trim().split(/\r?\n/)
    const headers = rows.shift()?.split(",").map(h => h.trim()) ?? []
    const data = rows.map(line => {
      const cols = line.split(",")
      const obj: Record<string,string> = {}
      headers.forEach((h, i) => obj[h] = (cols[i] ?? "").trim())
      return obj
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "FETCH_ERROR" }, { status: 500 })
  }
}
