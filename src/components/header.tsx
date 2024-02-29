import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/toggle-theme-mode";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <span className="text-xl font-bold">Prisma with Next 14</span>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/users" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Users
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/posts" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Posts
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ModeToggle />
    </header>
  )
}