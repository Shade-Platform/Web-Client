"use client"

import { useEffect, useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Github, Target, Menu } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { verifyToken } from "@/lib/auth/verifyToken"

interface RouteProps {
  href: string
  label: string
}

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    verifyToken().then(setIsLoggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/login")
  }

  const loggedOutRoutes: RouteProps[] = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Signup" },
  ]

  const loggedInRoutes: RouteProps[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/upload", label: "Upload" },
  ]

  const routeList = isLoggedIn ? loggedInRoutes : loggedOutRoutes

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          {/* Logo */}
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex items-center gap-1">
              <Target />
              Shade
            </Link>
          </NavigationMenuItem>

          {/* Mobile menu */}
          <span className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-5 w-5" />
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">Shade</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-4">
                  {routeList.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}

                  {isLoggedIn && (
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        handleLogout()
                      }}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Logout
                    </button>
                  )}

                  <a
                    href="https://github.com/Shade-Platform/Web-Client"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`border ${buttonVariants({ variant: "secondary" })}`}
                  >
                    <Github className="mr-2 w-5 h-5" />
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop menu */}
          <nav className="hidden md:flex gap-2 items-center">
            {routeList.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
              >
                {label}
              </Link>
            ))}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className={buttonVariants({ variant: "destructive" })}
              >
                Logout
              </button>
            )}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              href="https://github.com/Shade-Platform/Web-Client"
              target="_blank"
              rel="noopener noreferrer"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <Github className="mr-2 w-5 h-5" />
              Github
            </a>
            {/* <a
              rel="noreferrer noopener"
              href="/login"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              Login
            </a> */}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
