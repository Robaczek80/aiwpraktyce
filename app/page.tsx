export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">AI w Praktyce</h1>
      <p>Praktyczne zastosowania AI: biznes, życie osobiste, narzędzia, zarabianie.</p>
      <ul className="grid md:grid-cols-2 gap-4">
        <li className="rounded-xl border bg-white p-4"><a href="/biznes" className="font-medium">Biznes →</a><p className="text-sm text-gray-600">Case study, playbooki, procesy.</p></li>
        <li className="rounded-xl border bg-white p-4"><a href="/osobiste" className="font-medium">Osobiste →</a><p className="text-sm text-gray-600">Automatyzacje dnia codziennego.</p></li>
        <li className="rounded-xl border bg-white p-4"><a href="/narzedzia" className="font-medium">Narzędzia →</a><p className="text-sm text-gray-600">Stack, integracje, arkusze.</p></li>
        <li className="rounded-xl border bg-white p-4"><a href="/zarabianie" className="font-medium">Zarabianie →</a><p className="text-sm text-gray-600">Monetyzacja, oferty, afiliacja.</p></li>
      </ul>
    </section>
  )
}
