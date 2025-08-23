"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:rotate-0 dark:scale-100" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:-rotate-90 dark:scale-0  " />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
