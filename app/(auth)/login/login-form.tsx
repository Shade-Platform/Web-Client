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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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
                  className="!border-2 !border-solid !border-gray-400 px-5 py-4 h-14 text-lg"
                />
              </div>
              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md h-14 text-lg font-semibold rounded-3xl"
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
