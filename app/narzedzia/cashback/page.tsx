"use client"
import { useEffect, useState, useMemo } from "react"

type Row = { shop: string; site: string; rate: string; url: string }

const SITE_LABELS: Record<string,string> = {
  goodie: "Goodie",
  letyshops: "LetyShops",
  planetplus: "PlanetPlus",
  refunder: "Refunder",
  picodi: "Picodi",
}
const ALL_SITES = Object.values(SITE_LABELS)
const norm = (s: string) => (s || "").trim().toLowerCase()

export default function CashbackPage() {
  const [data, setData] = useState<Row[]>([])
  const [shops, setShops] = useState<string[]>([])
  const [selectedShop, setSelectedShop] = useState("")
  const [amount, setAmount] = useState<number | "">("")

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/cashback?nocache=" + Date.now(), { cache: "no-store" })
      const json: Row[] = await res.json()
      const cleaned = json.map(r => ({
        shop: (r.shop || "").trim(),
        site: (r.site || "").trim(),
        rate: (r.rate || "").trim(),
        url: (r.url || "").trim(),
      }))
      setData(cleaned)
      setShops([...new Set(cleaned.map(i => i.shop))].sort((a,b)=>a.localeCompare(b)))
    })()
  }, [])

  const rows = useMemo(() => {
    if (!selectedShop) return []
    const bySite = new Map<string, Row>()
    data.filter(i => i.shop === selectedShop).forEach(i => {
      const key = norm(i.site)
      const label = SITE_LABELS[key] || i.site.trim()
      bySite.set(label, { ...i, site: label })
    })
    const base: Row[] = ALL_SITES.map(label =>
      bySite.get(label) ?? { shop: selectedShop, site: label, rate: "", url: "" }
    )
    const extras = [...bySite.keys()]
      .filter(k => !ALL_SITES.includes(k))
      .map(k => bySite.get(k)!) as Row[]
    return [...base, ...extras].sort((a,b)=>parseFloat(b.rate||"0") - parseFloat(a.rate||"0"))
  }, [data, selectedShop])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-3">
          Kalkulator i porównywarka cashback
        </h1>
        <p className="text-gray-400 text-lg">
          Oblicz realny zwrot z zakupów i sprawdź, który serwis daje najwięcej.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select
          value={selectedShop}
          onChange={e=>setSelectedShop(e.target.value)}
          className="p-3 rounded-xl bg-gray-800/70 backdrop-blur border border-gray-700 text-white w-72 shadow-lg"
        >
          <option value="">🛒 Wybierz sklep</option>
          {shops.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <input
          type="number"
          placeholder="Kwota zakupów (zł)"
          value={amount === "" ? "" : amount}
          onChange={e=>setAmount(e.target.value ? parseFloat(e.target.value) : "")}
          className="p-3 rounded-xl bg-gray-800/70 backdrop-blur border border-gray-700 text-white w-72 text-center shadow-lg"
        />
      </div>

      {rows.length > 0 && (
        <div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-800/80">
              <tr className="text-cyan-400 text-sm uppercase tracking-wide">
                <th className="py-3 px-4">Serwis</th>
                <th className="py-3 px-4">Zwrot %</th>
                <th className="py-3 px-4">Kwota zwrotu</th>
                <th className="py-3 px-4">Link</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i) => {
                const rate = parseFloat(r.rate || "0")
                const cashback = amount && rate ? ((amount * rate) / 100).toFixed(2) : "-"
                const topColor = i === 0 ? "text-green-400" : i === 1 ? "text-yellow-400" : i === 2 ? "text-orange-400" : "text-white"
                return (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/40 transition">
                    <td className={`py-3 px-4 font-semibold ${topColor}`}>{r.site}</td>
                    <td className="py-3 px-4">{r.rate ? rate.toFixed(1) + "%" : "–"}</td>
                    <td className="py-3 px-4">{cashback !== "-" ? cashback + " zł" : "–"}</td>
                    <td className="py-3 px-4">
                      {r.url ? <a href={r.url} target="_blank" className="text-cyan-400 hover:underline">Odwiedź</a> : "–"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 p-4">
            Stawki poglądowe. Potwierdź w serwisie partnerskim.
          </p>
        </div>
      )}
    </main>
  )
}
