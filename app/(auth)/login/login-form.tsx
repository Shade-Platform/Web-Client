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
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from 'next/navigation';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginHandler = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, save the token (or handle as needed)
        // setToken(data.token);
        localStorage.setItem("token", data.token)
        console.log('Login successful:', data.token);
        router.push("/dashboard")
      } else {
        // Handle the error response
        // setError('Invalid credentials');
        console.log('Login failed:', data);
      }
    } catch (err) {
      // Handle any errors during the fetch request
      // setError('Something went wrong');
      console.error('Error during login:', err);
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Log in</CardTitle>
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
              <Button
                type="button"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md h-14 text-lg font-semibold rounded-3xl"
                onClick={() => loginHandler()}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
