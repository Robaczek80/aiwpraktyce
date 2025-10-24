import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <header className="container pt-10 pb-8">
        <p className="text-sm font-medium text-gray-500">AI w Praktyce</p>
        <h1 className="h1 mt-2">Zwiększ efektywność, oszczędzaj, zarabiaj z AI</h1>
        <p className="lead mt-3 max-w-2xl">
          Konkretne poradniki, narzędzia i kalkulatory. Zero marketingu, same liczby i wdrożenia.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/narzedzia" className="btn">Narzędzia i kalkulatory</Link>
          <Link href="/biznes" className="btn-ghost">Zastosowania w biznesie</Link>
        </div>
      </header>

      {/* SEKCE */}
      <section className="container grid gap-4 sm:grid-cols-2">
        <Link href="/biznes" className="card">
          <div className="card-body">
            <h2 className="h2">Biznes</h2>
            <p className="lead mt-1">Procesy, automatyzacje, case studies i ROI.</p>
          </div>
        </Link>
        <Link href="/osobiste" className="card">
          <div className="card-body">
            <h2 className="h2">Osobiste</h2>
            <p className="lead mt-1">Organizacja, oszczędzanie, produktywność z AI.</p>
          </div>
        </Link>
        <Link href="/narzedzia" className="card">
          <div className="card-body">
            <h2 className="h2">Narzędzia</h2>
            <p className="lead mt-1">Kalkulatory: ROI, cashback, prąd i więcej.</p>
          </div>
        </Link>
        <Link href="/zarabianie" className="card">
          <div className="card-body">
            <h2 className="h2">Zarabianie</h2>
            <p className="lead mt-1">Modele przychodu, afiliacja, automaty.</p>
          </div>
        </Link>
      </section>
    </div>
  )
}
