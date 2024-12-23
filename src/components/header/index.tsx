import Link from "next/link";
import React from "react";
import { SparklesIcon } from "lucide-react";
import Profile from "../profile";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <header className="z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-stretch justify-between py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 px-4 sm:px-6">
      <Link
        className="flex flex-row flex-nowrap items-center justify-center gap-x-1.5 rounded-lg pr-1.5 text-lg font-medium leading-none"
        href="/"
      >
        <SparklesIcon size={18} />
        <span>Kindle Lyrics</span>
      </Link>

      <div className="flex flex-row flex-nowrap items-center gap-x-1.5">
        <Profile />
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
