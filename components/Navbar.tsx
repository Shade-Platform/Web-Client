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
import { Button, buttonVariants } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { verifyToken } from "@/lib/auth/verifyToken"
import { useAuth } from "@/lib/auth/authContext"

interface RouteProps {
  href: string
  label: string
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const { logout, user } = useAuth();

  const isLoggedIn = user !== null && user !== undefined

  useEffect(() => {
    verifyToken()
  }, [])


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
                  {isLoggedIn ? (
                    <button
                      onClick={() => logout()}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Logout
                    </button>
                  ) : (
                    <a
                      rel="noreferrer noopener"
                      href="/login"
                      className={`border ${buttonVariants({ variant: "secondary" })}`}
                    >
                      Login
                    </a>
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
            {isLoggedIn && (
              <Link
                key={"Dashboard"}
                href={"/dashboard"}
                className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
              >
                {"Dashboard"}
              </Link>
            )}
          </nav>

          <div className="hidden md:flex gap-2">
            <Link
              href="https://github.com/Shade-Platform/Web-Client"
              target="_blank"
              rel="noopener noreferrer"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <Github className="mr-2 w-5 h-5" />
              Github
            </Link>
            {isLoggedIn ? (
              <Button onClick={() => logout()} variant={"destructive"}>
                Logout
              </Button>
            ) : (
              <a
                rel="noreferrer noopener"
                href="/login"
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                Login
              </a>
            )}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
