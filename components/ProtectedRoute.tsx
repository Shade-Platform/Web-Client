"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { verifyToken } from "@/lib/auth/verifyToken"

// Defines a protected route component that checks if the user is authenticated
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const valid = await verifyToken()
      if (!valid) {
        router.replace("/login")
        setAllowed(false)
      } else {
        setAllowed(true)
      }
    }
    check()
  }, [])

  if (allowed === null) {
    return <Suspense fallback={<p>Verifying token...</p>}></Suspense>;
    // return <p>Verifying token...</p>;
  }

  if (allowed === false) {
    return null // block render while redirecting
  }

  return <>{children}</>
}
