import Link from "next/link"

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <header className="hero-bg py-20 text-center px-6">
        <h1 className="h1 mb-4">AI w Praktyce</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Zwiększ efektywność, oszczędzaj, zarabiaj z AI. 
          Praktyczne wdrożenia, narzędzia i analizy — w jednym miejscu.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/narzedzia" className="btn">Narzędzia i kalkulatory</Link>
          <Link href="/biznes" className="btn-ghost">Zastosowania w biznesie</Link>
        </div>
      </header>

      {/* SEKCE */}
      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 max-w-5xl mx-auto px-4 py-16">
        <Link href="/biznes" className="card">
          <div className="card-body">
            <h2 className="h2 mb-2">Biznes</h2>
            <p className="lead">Procesy, automatyzacje, case studies i ROI.</p>
          </div>
        </Link>
        <Link href="/osobiste" className="card">
          <div className="card-body">
            <h2 className="h2 mb-2">Osobiste</h2>
            <p className="lead">Organizacja, oszczędzanie, produktywność z AI.</p>
          </div>
        </Link>
        <Link href="/narzedzia" className="card">
          <div className="card-body">
            <h2 className="h2 mb-2">Narzędzia</h2>
            <p className="lead">Kalkulatory ROI, cashback, prąd i więcej.</p>
          </div>
        </Link>
        <Link href="/zarabianie" className="card">
          <div className="card-body">
            <h2 className="h2 mb-2">Zarabianie</h2>
            <p className="lead">Modele przychodu, afiliacja, automaty.</p>
          </div>
        </Link>
      </section>
    </div>
  )
}
