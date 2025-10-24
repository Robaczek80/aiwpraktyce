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
    return [...base, ...extras].sort(
      (a,b) => parseFloat(b.rate || "0") - parseFloat(a.rate || "0")
    )
  }, [data, selectedShop])

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">Kalkulator i porównywarka cashback</h1>
      <p className="mb-6 text-gray-300">Oblicz kwotę zwrotu i porównaj serwisy cashback.</p>

      <select
        value={selectedShop}
        onChange={e=>setSelectedShop(e.target.value)}
        className="p-3 rounded bg-gray-800 border border-gray-600 text-white w-72 mb-4"
      >
        <option value="">Wybierz sklep</option>
        {shops.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <input
        type="number"
        placeholder="Kwota zakupów (zł)"
        value={amount === "" ? "" : amount}
        onChange={e=>setAmount(e.target.value ? parseFloat(e.target.value) : "")}
        className="p-3 rounded bg-gray-800 border border-gray-600 text-white w-72 mb-8 text-center"
      />

      {rows.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-3xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-cyan-400 border-b border-gray-700">
                <th className="py-2 text-left">Serwis</th>
                <th className="py-2 text-left">Zwrot %</th>
                <th className="py-2 text-left">Kwota zwrotu</th>
                <th className="py-2 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i) => {
                const rate = parseFloat(r.rate || "0")
                const cashback = amount && rate ? ((amount * rate) / 100).toFixed(2) : "-"
                return (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="py-2">{r.site}</td>
                    <td className="py-2">{r.rate ? rate.toFixed(1) + "%" : "–"}</td>
                    <td className="py-2">{cashback !== "-" ? cashback + " zł" : "–"}</td>
                    <td className="py-2">
                      {r.url ? <a href={r.url} target="_blank" className="text-cyan-400 hover:underline">Odwiedź</a> : "–"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-4">
            Stawki cashback są poglądowe. Zweryfikuj aktualne wartości w serwisach partnerskich.
          </p>
        </div>
      )}
    </main>
  )
}
