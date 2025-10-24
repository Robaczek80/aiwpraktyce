"use client"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-semibold tracking-tight">AI w Praktyce</h1>
          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/biznes" className="hover:text-gray-900">Biznes</Link>
            <Link href="/osobiste" className="hover:text-gray-900">Osobiste</Link>
            <Link href="/narzedzia" className="hover:text-gray-900">Narzędzia</Link>
            <Link href="/zarabianie" className="hover:text-gray-900">Zarabianie</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          AI w Praktyce
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Narzędzia, analizy i praktyczne sposoby wykorzystania sztucznej inteligencji 
          w biznesie, finansach i życiu codziennym.
        </p>
        <Link
          href="/narzedzia"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          Przejdź do narzędzi
        </Link>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 px-6 pb-20">
        {[
          { title: "AI w Biznesie", desc: "Jak wykorzystać modele AI do analizy danych, automatyzacji i sprzedaży.", link: "/biznes" },
          { title: "AI w Życiu Codziennym", desc: "Codzienne zastosowania AI – od planowania po produktywność.", link: "/osobiste" },
          { title: "Narzędzia AI", desc: "Zestaw kalkulatorów i aplikacji wspierających efektywność.", link: "/narzedzia" },
          { title: "Zarabianie z AI", desc: "Modele przychodowe, automatyzacje i inwestycje w AI.", link: "/zarabianie" }
        ].map((s, i) => (
          <Link key={i} href={s.link} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{s.title}</h3>
            <p className="text-gray-600 text-sm">{s.desc}</p>
          </Link>
        ))}
      </section>

      <section className="max-w-4xl mx-auto text-center py-16 border-t border-gray-200">
        <h3 className="text-2xl font-semibold mb-4">Dołącz do społeczności AI w Praktyce</h3>
        <p className="text-gray-600 mb-6">Zapisz się do newslettera, by otrzymywać nowe narzędzia i analizy.</p>
        <form className="flex flex-col sm:flex-row justify-center gap-3 px-6">
          <input
            type="email"
            placeholder="Twój adres e-mail"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-80 focus:ring-2 focus:ring-gray-800 outline-none"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
          >
            Zapisz się
          </button>
        </form>
      </section>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI w Praktyce. Wszystkie prawa zastrzeżone.
      </footer>
    </main>
  )
}
