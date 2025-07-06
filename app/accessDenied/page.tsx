"use client"

import { ShieldAlert, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted text-center px-6">
      <div className="max-w-xl space-y-6 bg-background p-8 rounded-xl shadow-md border">
        <ShieldAlert className="h-12 w-12 text-red-600 mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground text-lg">
          Your activity has been flagged as suspicious and your access was temporarily blocked.
        </p>
        <p className="text-muted-foreground">
          If you believe this was a mistake, please reach out to our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:support@shade.cloud" className="inline-flex">
            <Button variant="destructive">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
