import "./globals.css"
import Nav from "./_components/Nav"
import Footer from "./_components/Footer"
import GA from "./_components/GA"

export const metadata = {
  title: "AI w Praktyce",
  description: "AI: biznes, osobiste, narzędzia, zarabianie",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
        <GA />
      </body>
    </html>
  )
}
