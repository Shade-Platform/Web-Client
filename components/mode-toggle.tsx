"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return ( theme === 'light'
          ? <Toggle onPressedChange={() => setTheme('dark')}><Moon /></Toggle>
          : <Toggle onPressedChange={() => setTheme('light')}><Sun /></Toggle>
  );
}

