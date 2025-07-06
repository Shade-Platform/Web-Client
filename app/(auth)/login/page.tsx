"use client"

import { Navbar } from "@/components/Navbar"
import { LoginForm } from "./_components/login-form"
import { SocialLoginOptions } from "./_components/SocialLoginOptions"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-muted p-6 md:p-10">
        <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_auto_1fr] sm:grid-rows-[1fr_auto_1fr]">
          {/* Left Section */}
          <div className="bg-card col-span-1 rounded-lg p-6 shadow md:col-span-1">
            <LoginForm setErrorMessage={setErrorMessage} />
            {errorMessage && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Divider */}
          <div className="col-span-1 flex items-center justify-center lg:col-span-1">
            <div className="relative flex h-full w-full items-center justify-center lg:w-auto">
              <div className="h-0.5 w-full bg-gray-300 dark:bg-gray-400 lg:h-full lg:w-0.5" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-muted px-4 py-2 text-sm font-medium text-muted-foreground rounded-md md:px-3 md:py-6">
                OR
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-card col-span-1 flex items-center justify-center rounded-lg p-6 shadow md:col-span-1">
            <SocialLoginOptions />
          </div>

          {/* Can't login? link */}
          <div className="col-span-full -mt-2 text-center">
            <a href="/forgot-password" className="text-md font-medium text-foreground hover:text-primary transition-colors hover:underline">
              Can't login?
            </a>
            {"  |  "}
            <a href="/signup" className="text-md font-medium text-foreground hover:text-primary transition-colors hover:underline">
              Don't Have an Account?
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
