import Link from "next/link";
import React from "react";
import Profile from "../profile";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <header className="z-20 mx-auto flex h-14 w-full max-w-5xl flex-row flex-nowrap items-stretch justify-between py-3 duration-1000 ease-in-out animate-in fade-in slide-in-from-top-4 px-4 sm:px-6">
      <Link
        className="flex flex-row flex-nowrap items-center justify-center gap-x-1.5 rounded-lg pr-1.5 text-lg font-medium leading-none"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          ></path>
        </svg>
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
