import "./globals.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import GA from "./_components/GA"

export const metadata = {
  title: "AI w Praktyce",
  description: "AI: biznes, osobiste, narzędzia, zarabianie",
}

const nav = [
  { href: "/", label: "Start" },
  { href: "/biznes", label: "Biznes" },
  { href: "/osobiste", label: "Osobiste" },
  { href: "/narzedzia", label: "Narzędzia" },
  { href: "/zarabianie", label: "Zarabianie" },
]

function Nav() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">AI w Praktyce</Link>
        <ul className="flex gap-4 text-sm">
          {nav.map(i => {
            const active = pathname === i.href
            return (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className={"px-2 py-1 rounded " + (active ? "bg-gray-900 text-white" : "hover:bg-gray-100")}
                >{i.label}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
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
