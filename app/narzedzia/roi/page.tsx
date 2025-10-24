"use client"
import { useState } from "react"

export default function RoiCalculator() {
  const [cost, setCost] = useState("")
  const [saving, setSaving] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calc = () => {
    const c = parseFloat(cost)
    const s = parseFloat(saving)
    if (!c || !s) return setResult(null)
    const roi = ((s - c) / c) * 100
    setResult(roi)
  }

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Kalkulator ROI automatyzacji</h1>
      <p className="text-gray-600 text-sm">Oblicz zwrot z inwestycji w automatyzację lub AI.</p>

      <label className="block text-sm font-medium">
        Koszt wdrożenia (zł)
        <input type="number" value={cost} onChange={e => setCost(e.target.value)} className="w-full border rounded p-2 mt-1" />
      </label>

      <label className="block text-sm font-medium">
        Roczne oszczędności (zł)
        <input type="number" value={saving} onChange={e => setSaving(e.target.value)} className="w-full border rounded p-2 mt-1" />
      </label>

      <button onClick={calc} className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">Oblicz ROI</button>

      {result !== null && <p className="text-lg font-medium">ROI: {result.toFixed(1)}%</p>}
    </section>
  )
}
