"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/authContext";

// Defines a protected route component that checks if the user is authenticated
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const router = useRouter()
  const { user, loading } = useAuth();

  useEffect(() => {
    const check = async () => {
      console.log(user)
      if (user === null && !loading) {
        router.replace("/login")
        setAllowed(false)
      } else if (!loading) {
        setAllowed(true)
      }
    }
    check()
  }, [loading, user])

  if (allowed === null) {
    return <Suspense fallback={<p>Verifying token...</p>}></Suspense>;
    // return <p>Verifying token...</p>;
  }

  if (allowed === false) {
    return null // block render while redirecting
  }

  return <>{children}</>
}
