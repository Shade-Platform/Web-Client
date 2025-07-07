"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/auth/authContext";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  setErrorMessage?: (msg: string | null) => void
}

export function LoginForm({
  className,
  setErrorMessage,
  ...props
}: LoginFormProps) {
  const router = useRouter()
  const { login } = useAuth()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const showError = (msg: string) => {
    if (setErrorMessage) {
      setErrorMessage(msg)
    } else {
      setLocalError(msg)
    }
  }

  const loginHandler = async () => {
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        await login(data.token)
        router.push("/dashboard")
      } else {
        showError("Invalid email or password.")
        setTimeout(() => location.reload(), 300) // Slight delay to show error briefly
      }
    } catch (err) {
      showError("Something went wrong.")
      setTimeout(() => location.reload(), 300)
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); loginHandler(); }}>
            <div className="grid gap-6 text-lg">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-base font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shade@example.com"
                  required
                  className="!border-2 !border-solid !border-gray-400 px-5 py-4 h-14 text-lg"
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-medium">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:underline"
                  >
                    {isPasswordVisible ? (
                      <>
                        <EyeOff className="h-5 w-5" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-5 w-5" />
                        Show
                      </>
                    )}
                  </button>
                </div>
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="!border-2 !border-solid !border-gray-400 px-5 py-4 h-14 text-lg"
                />
              </div>

              {(localError && !setErrorMessage) && (
                <div className="text-red-600 font-medium text-center">
                  {localError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md h-14 text-lg font-semibold rounded-3xl flex justify-center items-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
