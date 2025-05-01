"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // TODO: Discuss whether it should be Sun to change to light mode, or Sun when light mode is on.
  return ( theme === 'light'
          ? <Toggle variant="default" onPressedChange={() => setTheme('dark')}><Moon /></Toggle>
          : <Toggle variant="default" onPressedChange={() => setTheme('light')}><Sun /></Toggle>
  );
}

