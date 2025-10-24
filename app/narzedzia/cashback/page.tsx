"use client"
import { useEffect, useState } from "react"

interface CashbackRow {
  shop: string
  site: string
  rate: string
  url: string
}

export default function CashbackPage() {
  const [data, setData] = useState<CashbackRow[]>([])
  const [shops, setShops] = useState<string[]>([])
  const [selectedShop, setSelectedShop] = useState<string>("")
  const [filtered, setFiltered] = useState<CashbackRow[]>([])

  useEffect(() => {
    fetch("/api/cashback")
      .then(res => res.json())
      .then((json: CashbackRow[]) => {
        setData(json)
        const uniqueShops = [...new Set(json.map(item => item.shop))].sort()
        setShops(uniqueShops)
      })
      .catch(() => setData([]))
  }, [])

  useEffect(() => {
    if (selectedShop) {
      setFiltered(data.filter(item => item.shop === selectedShop))
    } else {
      setFiltered([])
    }
  }, [selectedShop, data])

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">Porównywarka cashback sklepów</h1>
      <p className="mb-6 text-gray-300">Sprawdź, gdzie otrzymasz największy zwrot z zakupów online.</p>

      <select
        value={selectedShop}
        onChange={(e) => setSelectedShop(e.target.value)}
        className="p-3 rounded bg-gray-800 border border-gray-600 text-white w-72 mb-8"
      >
        <option value="">Wybierz sklep</option>
        {shops.map(shop => (
          <option key={shop} value={shop}>{shop}</option>
        ))}
      </select>

      {filtered.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-3xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-cyan-400 border-b border-gray-700">
                <th className="py-2 text-left">Platforma</th>
                <th className="py-2 text-left">Zwrot %</th>
                <th className="py-2 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .filter(item => item.rate || item.rate === "0")
                .sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate))
                .map((item, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="py-2">{item.site}</td>
                    <td className="py-2">{item.rate || "-"}</td>
                    <td className="py-2">
                      <a href={item.url} target="_blank" className="text-cyan-400 hover:underline">Odwiedź</a>
                    </td>
                  </tr>
                ))}
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
