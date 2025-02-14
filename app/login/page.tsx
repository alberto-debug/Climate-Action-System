"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LanguageSelector } from "@/components/language-selector"
import { Logo } from "@/components/logo"
import { auth } from "@/lib/firebase"
import { Facebook } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"
    if (!password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "An error occurred during login" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "An error occurred during Google login" })
    }
  }

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "An error occurred during Facebook login" })
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CLIMATE%20ACTION%20SYSTEM%20(9)_page-0006.jpg-YxWtteq1iHQ3gFj75hpA6DIxx8FpkM.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative">
        <header className="flex items-center justify-between p-6">
          <Logo />
          <LanguageSelector />
        </header>
        <main className="flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Login To Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
                <Button type="submit" className="w-full bg-[#7ac943] hover:bg-[#7ac943]/90" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
              <Button variant="outline" className="w-full justify-start gap-3" onClick={handleFacebookLogin}>
                <Facebook className="size-5 text-blue-600" />
                Login with Facebook
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3" onClick={handleGoogleLogin}>
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                  />
                </svg>
                Login with Google
              </Button>
              <div className="flex items-center justify-between">
                <Button asChild variant="link" className="text-[#7ac943]">
                  <a href="/signup">SIGN UP</a>
                </Button>
                <Button asChild variant="link" className="text-[#7ac943]">
                  <a href="/forgot-password">FORGOT PASSWORD</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

