import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Library } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Profile from "./profile";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-stretch justify-between py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 px-4 sm:px-6">
      <Link
        className="flex flex-row flex-nowrap items-center justify-center gap-x-1.5 rounded-lg pr-1.5 text-lg font-medium leading-none"
        href="/"
      >
        <Library size={18} />
        <span>Kindle Lyrics</span>
      </Link>

      <div className="flex flex-row flex-nowrap items-center gap-x-1.5">
        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Profile />
        </SignedIn>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
