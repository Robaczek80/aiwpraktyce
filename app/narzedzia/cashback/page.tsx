"use client"
import { useState } from "react"

type CashbackItem = {
  name: string
  url: string
  rate: number
}

const cashbackSites: CashbackItem[] = [
  { name: "LetyShops", url: "https://letyshops.com", rate: 4.5 },
  { name: "Goodie", url: "https://goodie.pl", rate: 5.0 },
  { name: "Refunder", url: "https://refunder.pl", rate: 3.2 },
  { name: "Planet Plus", url: "https://planetplus.pl", rate: 4.0 },
  { name: "Picodi", url: "https://picodi.com/pl", rate: 2.8 },
]

export default function CashbackCalculator() {
  const [amount, setAmount] = useState("")
  const [best, setBest] = useState<CashbackItem | null>(null)
  const [results, setResults] = useState<{ site: CashbackItem; cashback: number }[]>([])

  const calc = () => {
    const value = parseFloat(amount)
    if (!value || value <= 0) {
      setBest(null)
      setResults([])
      return
    }

    const res = cashbackSites.map(site => ({
      site,
      cashback: (site.rate / 100) * value,
    }))
    setResults(res)
    const max = res.reduce((a, b) => (b.cashback > a.cashback ? b : a))
    setBest(max.site)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="h1 mb-3">Kalkulator cashback</h1>
        <p className="lead max-w-2xl">
          Porównaj zwrot z zakupów w popularnych serwisach cashback. 
          Wpisz planowany wydatek i zobacz, gdzie zyskasz najwięcej.
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl space-y-4">
        <label className="block text-slate-300 font-medium">
          Planowany wydatek (zł)
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="mt-2 w-full p-2 rounded bg-slate-900 border border-slate-700 text-slate-100"
            placeholder="np. 500"
          />
        </label>
        <button onClick={calc} className="btn">Oblicz zwrot</button>
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          <h2 className="h2">Porównanie serwisów</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700 text-left">
                <th className="py-2 px-2">Serwis</th>
                <th className="py-2 px-2">Zwrot (%)</th>
                <th className="py-2 px-2">Kwota zwrotu (zł)</th>
                <th className="py-2 px-2">Strona</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.site.name} className="border-b border-slate-800 hover:bg-slate-800/40">
                  <td className="py-2 px-2 font-medium">{r.site.name}</td>
                  <td className="py-2 px-2">{r.site.rate.toFixed(1)}%</td>
                  <td className="py-2 px-2">{r.cashback.toFixed(2)}</td>
                  <td className="py-2 px-2">
                    <a href={r.site.url} target="_blank" className="text-blue-400 hover:text-blue-300">
                      Odwiedź
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {best && (
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500">
              <p className="text-white text-lg">
                💡 Najbardziej opłacalny serwis: <strong>{best.name}</strong> ({best.rate}%)
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
