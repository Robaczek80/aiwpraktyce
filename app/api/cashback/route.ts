import { NextResponse } from "next/server"

function toCsvUrl(u: string) {
  const i = u.indexOf("/edit")
  return (i > 0 ? u.slice(0, i) : u).replace(/\/$/, "") + "/gviz/tq?tqx=out:csv"
}

function clean(v: string) {
  if (!v) return ""
  const s = v
    .trim()
    .replace(/^"+|"+$/g, "")
    .replace(/^'+|'+$/g, "")
    .replace(/\\"/g, "")
    .replace(/""/g, '"')

  // Jeśli wartość wygląda jak data (np. "4.5" → dzień.miesiąc), zostaw jako tekst
  if (/^\d{1,2}\.\d{1,2}$/.test(s)) return s
  return s
}

export async function GET() {
  try {
    const sheetUrl = process.env.SHEET_CASHBACK_URL
    if (!sheetUrl) {
      return NextResponse.json({ error: "SHEET_URL_MISSING" }, { status: 500 })
    }

    const csvUrl = toCsvUrl(sheetUrl)
    const res = await fetch(csvUrl, { cache: "no-store" })
    if (!res.ok) {
      return NextResponse.json({ error: `HTTP_${res.status}` }, { status: res.status })
    }

    const text = await res.text()
    const delimiter = text.includes(";") ? ";" : ","
    const lines = text.trim().split(/\r?\n/)
    const headers = lines.shift()?.split(delimiter).map(clean) ?? []
    const data = lines.map(line => {
      const cols = line.split(delimiter)
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => (obj[h] = clean(cols[i] ?? "")))
      return obj
    })

    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "FETCH_ERROR" }, { status: 500 })
  }
}
