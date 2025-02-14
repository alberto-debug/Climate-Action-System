import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { Logo } from "@/components/logo"

export default function Page() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CLIMATE%20ACTION%20SYSTEM%20(9)_page-0001.jpg-5joKD0kDdgBofKMIh7YcdG3yBKbCgw.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative">
        <header className="flex items-center justify-between p-6">
          <Logo />
          <LanguageSelector />
        </header>
        <main className="flex flex-col items-center justify-center px-4 py-20 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold sm:text-6xl">CLIMATE ACTION SYSTEM</h1>
          <p className="mb-2 text-2xl font-light">ClimAct</p>
          <h2 className="mb-8 text-3xl font-semibold">ABOUT US</h2>
          <Button asChild className="bg-[#7ac943] px-8 py-6 text-lg hover:bg-[#7ac943]/90">
            <a href="/login">LOGIN/SIGN UP</a>
          </Button>
        </main>
      </div>
    </div>
  )
}

