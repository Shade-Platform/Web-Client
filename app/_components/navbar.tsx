"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b-2 dark:border-stone-950 dark:bg-black w-screen-xl flex items-center justify-center p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard                
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
