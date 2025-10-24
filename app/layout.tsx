import "./globals.css"
import Nav from "./_components/Nav"
import GA from "./_components/GA"

export const metadata = {
  title: "AI w Praktyce",
  description: "AI: biznes, osobiste, narzędzia, zarabianie",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Nav />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-gray-500">
          © {new Date().getFullYear()} AI w Praktyce • Efektywność i oszczędzanie z AI
        </footer>
        <GA />
      </body>
    </html>
  )
}
