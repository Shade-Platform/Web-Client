import { GalleryVerticalEnd } from "lucide-react"

import { SignupForm } from "./_components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 md:px-10 md:py-12 bg-muted">
      <div className="max-w-2xl w-full mx-auto">
        <SignupForm />
        <div className="text-center mt-6">
          Already have an account? &nbsp;
          <a
            href="/login"
            className="text-md font-medium text-foreground hover:text-primary transition-colors hover:underline"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  )
}
