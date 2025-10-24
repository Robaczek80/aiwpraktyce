"use client"
import { useState } from "react"

type CashbackRow = {
  shop: string
  offers: { site: string; rate: number; url: string }[]
}

const data: CashbackRow[] = [
  {
    shop: "Allegro",
    offers: [
      { site: "Goodie", rate: 2.2, url: "https://goodie.pl" },
      { site: "LetyShops", rate: 1.5, url: "https://letyshops.com" },
      { site: "Refunder", rate: 1.0, url: "https://refunder.pl" },
    ],
  },
  {
    shop: "Media Expert",
    offers: [
      { site: "LetyShops", rate: 5.0, url: "https://letyshops.com" },
      { site: "PlanetPlus", rate: 4.5, url: "https://planetplus.pl" },
      { site: "Goodie", rate: 4.0, url: "https://goodie.pl" },
    ],
  },
  {
    shop: "Empik",
    offers: [
      { site: "Goodie", rate: 7.5, url: "https://goodie.pl" },
      { site: "Refunder", rate: 6.0, url: "https://refunder.pl" },
      { site: "LetyShops", rate: 5.5, url: "https://letyshops.com" },
    ],
  },
  {
    shop: "Zalando",
    offers: [
      { site: "LetyShops", rate: 6.0, url: "https://letyshops.com" },
      { site: "Goodie", rate: 5.0, url: "https://goodie.pl" },
      { site: "Picodi", rate: 3.0, url: "https://picodi.com/pl" },
    ],
  },
]

export default function CashbackShops() {
  const [amount, setAmount] = useState("")
  const [selected, setSelected] = useState(data[0])
  const [result, setResult] = useState<{ site: string; cashback: number }[]>([])

  const calc = () => {
    const v = parseFloat(amount)
    if (!v || v <= 0) return setResult([])
    const res = selected.offers.map(o => ({
      site: o.site,
      cashback: (v * o.rate) / 100,
    }))
    setResult(res)
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="h1 mb-3">Porównywarka cashback sklepów</h1>
        <p className="lead max-w-2xl">
          Sprawdź, gdzie otrzymasz największy zwrot z zakupów online.
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl space-y-4">
        <label className="block font-medium text-slate-300">
          Wybierz sklep:
          <select
            className="mt-2 w-full p-2 rounded bg-slate-900 border border-slate-700 text-slate-100"
            value={selected.shop}
            onChange={e => setSelected(data.find(x => x.shop === e.target.value) || data[0])}
          >
            {data.map(s => <option key={s.shop}>{s.shop}</option>)}
          </select>
        </label>

        <label className="block font-medium text-slate-300">
          Kwota zakupów (zł)
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

      {result.length > 0 && (
        <div className="space-y-6">
          <h2 className="h2">Porównanie serwisów cashback</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700 text-left">
                <th className="py-2 px-2">Serwis</th>
                <th className="py-2 px-2">Stawka (%)</th>
                <th className="py-2 px-2">Zwrot (zł)</th>
                <th className="py-2 px-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {selected.offers.map(o => (
                <tr key={o.site} className="border-b border-slate-800 hover:bg-slate-800/40">
                  <td className="py-2 px-2 font-medium">{o.site}</td>
                  <td className="py-2 px-2">{o.rate.toFixed(1)}%</td>
                  <td className="py-2 px-2">{((parseFloat(amount) || 0) * o.rate / 100).toFixed(2)}</td>
                  <td className="py-2 px-2">
                    <a href={o.url} target="_blank" className="text-blue-400 hover:text-blue-300">Odwiedź</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-sm text-slate-400 mt-4">
            ⚠️ Stawki mają charakter poglądowy. Przed zakupem sprawdź aktualne wartości cashback
            bezpośrednio w serwisie partnerskim.
          </p>
        </div>
      )}
    </section>
  )
}
