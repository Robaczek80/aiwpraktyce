import Link from "next/link"

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Narzędzia</h1>
      <p>Praktyczne kalkulatory i arkusze do analizy efektywności.</p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>
          <Link href="/narzedzia/roi" className="text-blue-600 hover:underline">
            Kalkulator ROI automatyzacji
          </Link>
        </li>
      </ul>
    </section>
  )
}
