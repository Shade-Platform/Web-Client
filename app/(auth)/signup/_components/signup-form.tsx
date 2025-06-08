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
import { useRouter } from 'next/navigation';

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const router = useRouter()

  const[email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const signupHandler = async () => {
    if (email == "" || name == "" || password == "" || repeatPassword == "") {
      console.error("fields are empty")
    }

    if (password !== repeatPassword) {
      console.error("passwords doens't match")
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Signup failed:", error);
        return;
      }

      const result = await response.json();
      console.log("Signup successful:", result);
      router.push("/login")
    } catch (error) {
      console.error("Network error:", error);
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
          <form>
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
                <Label htmlFor="name" className="text-base font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="!border-2 !border-solid !border-gray-400 px-5 py-4 h-14 text-lg"
                />

                {/* Password Rules in 2x2 Grid */}
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {passwordCriteria.length ? (
                      <CheckCircle className="text-green-600 w-4 h-4" />
                    ) : (
                      <Circle className="text-gray-400 w-4 h-4" />
                    )}
                    Use 8 or more characters
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordCriteria.upperLower ? (
                      <CheckCircle className="text-green-600 w-4 h-4" />
                    ) : (
                      <Circle className="text-gray-400 w-4 h-4" />
                    )}
                    Use upper and lower case letters (e.g. Aa)
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordCriteria.number ? (
                      <CheckCircle className="text-green-600 w-4 h-4" />
                    ) : (
                      <Circle className="text-gray-400 w-4 h-4" />
                    )}
                    Use a number (e.g. 1234)
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordCriteria.symbol ? (
                      <CheckCircle className="text-green-600 w-4 h-4" />
                    ) : (
                      <Circle className="text-gray-400 w-4 h-4" />
                    )}
                    Use a symbol (e.g. !@#$)
                  </div>
                </div>

                <Label htmlFor="password-repeat" className="text-base font-medium mt-4">
                  Repeat Password
                </Label>
                <Input
                  id="password-repeat"
                  type={isPasswordVisible ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                  className="!border-2 !border-solid !border-gray-400 px-5 py-4 h-14 text-lg"
                />
              </div>
              <Button
                type="button"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md h-14 text-lg font-semibold rounded-3xl"
                onClick={signupHandler}
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
