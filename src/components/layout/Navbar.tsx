import { Link, useLocation } from "react-router-dom";
import { Sparkle, Moon, Sun, List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-3 shadow-sm"
        : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group ">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/40">
              <Sparkle className="w-6 h-6 text-primary-foreground" weight="fill" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Questify
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 font-medium">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-180 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-180 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" asChild className="rounded-xl px-6 text-muted-foreground hover:text-foreground">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild className="rounded-xl px-8 bg-foreground text-background hover:opacity-90 transition-all shadow-xl shadow-foreground/5 hover:translate-y-[-2px]">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl w-10 h-10 text-muted-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-180 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-180 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <List className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col gap-8 pt-16">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 font-black text-2xl">
                    <Sparkle className="w-6 h-6 text-primary" weight="fill" />
                    Questify
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="#features" className="text-lg font-medium hover:text-primary transition-colors">Features</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/auth" className="text-lg font-medium hover:text-primary transition-colors">Sign In</Link>
                  </SheetClose>
                </div>
                <div className="mt-auto">
                  <SheetClose asChild>
                    <Button asChild className="w-full h-12 rounded-xl text-lg font-bold">
                      <Link to="/auth">Get Started</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}