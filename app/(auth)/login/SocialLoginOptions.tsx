"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Mail } from "lucide-react"

export function SocialLoginOptions() {
  return (
    <div className="space-y-4">
      <Button
          variant="outline_gray"
          className="h-14 w-full text-lg font-medium transition-all duration-200 hover:scale-[1.02] rounded-3xl"
        >
          <FcGoogle className="h-6 w-6" />
          Continue with Google
        </Button>
      <Button
        variant="outline_gray"
        className="h-14 w-full text-lg font-medium transition-all duration-200 hover:scale-[1.02] rounded-3xl"
      >
        <FaFacebook className="h-6 w-6 text-[#1877F2]" />
        Continue with Facebook
      </Button>
      <Button
        variant="outline_gray"
        className="h-14 w-full text-lg font-medium transition-all duration-200 hover:scale-[1.02] rounded-3xl"
      >
        <Mail className="h-5 w-5 text-gray-600" />
        Sign in with Email
      </Button>
    </div>
  )
}
