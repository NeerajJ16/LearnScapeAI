import { useState } from "react"
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
import { buttonVariants } from "./ui/button"
import { Menu } from "lucide-react"
import { EnterIcon, Pencil1Icon } from "@radix-ui/react-icons"
import logo from "../assets/logo.svg"

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  { href: "#about", label: "About" },
  { href: "#howItWorks", label: "Guide" },
  { href: "#services", label: "What's Next" },
  { href: "#cta", label: "Get Started" },
  { href: "#faq", label: "FAQ" },
]

export const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center space-x-2"
            >
              <span>LearnscapeAI</span>
              <img src={logo} alt="Logo" className="w-8 h-8" />
            </a>
          </NavigationMenuItem>

          {/* Mobile */}
          <span className="flex md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-5 w-5">
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    LearnscapeAI
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setSheetOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="https://app.learnscapeai.com/"
                    className={`border ${buttonVariants({ variant: "secondary" })}`}
                  >
                    <EnterIcon className="mr-2 w-5 h-5" />
                    Sign In
                  </a>
                  <a
                    href="https://app.learnscapeai.com/signup"
                    className={`border ${buttonVariants({ variant: "secondary" })}`}
                  >
                    <Pencil1Icon className="mr-2 w-5 h-5" />
                    Sign Up
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              href="https://app.learnscapeai.com/"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <EnterIcon className="mr-2 w-5 h-5" />
              Sign In
            </a>
            <a
              href="https://app.learnscapeai.com/signup"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <Pencil1Icon className="mr-2 w-5 h-5" />
              Sign Up
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
