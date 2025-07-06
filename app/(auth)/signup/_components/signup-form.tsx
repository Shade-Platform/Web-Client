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
import { Eye, EyeOff, CheckCircle, Circle } from "lucide-react"
import { useRouter } from 'next/navigation'

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!email) newErrors.email = "Email is required"
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Invalid email format"

    if (!name) newErrors.name = "Name is required"

    if (!password) newErrors.password = "Password is required"
    else {
      if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters"
      else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password))
        newErrors.password = "Password must contain both upper and lower case letters"
      else if (!/\d/.test(password))
        newErrors.password = "Password must include a number"
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        newErrors.password = "Password must include a symbol"
    }

    if (repeatPassword !== password)
      newErrors.repeatPassword = "Passwords do not match"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const signupHandler = async () => {
    if (!validateForm()) return

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.text()
        console.error("Signup failed:", error)
        setErrors({ api: error })
        return
      }

      const result = await response.json()
      console.log("Signup successful:", result)
      router.push("/login")
    } catch (error) {
      console.error("Network error:", error)
      setErrors({ api: "Network error, please try again later." })
    }
  }

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  const passwordCriteria = {
    length: password.length >= 8,
    upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); signupHandler() }}>
            <div className="grid gap-6 text-lg">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-4 h-14 text-lg"
                  required
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-5 py-4 h-14 text-lg"
                  required
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
                  >
                    {isPasswordVisible ? <><EyeOff className="h-4 w-4" />Hide</> : <><Eye className="h-4 w-4" />Show</>}
                  </button>
                </div>
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-5 py-4 h-14 text-lg"
                  required
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

                {/* Password Strength Grid */}
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {passwordCriteria.length ? <CheckCircle className="text-green-600 w-4 h-4" /> : <Circle className="text-gray-400 w-4 h-4" />}
                    Use 8 or more characters
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordCriteria.upperLower ? <CheckCircle className="text-green-600 w-4 h-4" /> : <Circle className="text-gray-400 w-4 h-4" />}
                    Upper & lower case (e.g. Aa)
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordCriteria.number ? <CheckCircle className="text-green-600 w-4 h-4" /> : <Circle className="text-gray-400 w-4 h-4" />}
                    At least one number
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordCriteria.symbol ? <CheckCircle className="text-green-600 w-4 h-4" /> : <Circle className="text-gray-400 w-4 h-4" />}
                    At least one symbol
                  </div>
                </div>

                {/* Repeat Password */}
                <Label htmlFor="repeatPassword" className="mt-4">Repeat Password</Label>
                <Input
                  id="repeatPassword"
                  type={isPasswordVisible ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="px-5 py-4 h-14 text-lg"
                  required
                />
                {errors.repeatPassword && <p className="text-sm text-red-500">{errors.repeatPassword}</p>}
              </div>

              {/* API Error */}
              {errors.api && <p className="text-sm text-red-600 text-center">{errors.api}</p>}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md h-14 text-lg font-semibold rounded-3xl"
              >
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
