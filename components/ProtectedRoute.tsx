"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { verifyToken } from "@/lib/auth/verifyToken"

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
    return <p>Verifying token...</p> // or a spinner
  }

  if (allowed === false) {
    return null // block render while redirecting
  }

  return <>{children}</>
}
