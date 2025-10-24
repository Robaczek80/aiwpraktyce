import Link from "next/link"

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="h1 mb-4">Narzędzia AI</h1>
      <p className="lead mb-6">Praktyczne kalkulatory efektywności i oszczędności.</p>

      <ul className="space-y-4">
        <li>
          <Link href="/narzedzia/roi" className="text-blue-400 hover:underline">Kalkulator ROI automatyzacji</Link>
        </li>
        <li>
          <Link href="/narzedzia/cashback" className="text-blue-400 hover:underline">Kalkulator cashback</Link>
        </li>
      </ul>
    </section>
  )
}
