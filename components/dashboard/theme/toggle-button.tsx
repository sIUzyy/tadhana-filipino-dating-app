"use client";

// icons
import { Sun, Moon } from "lucide-react";

// lib
import { cn } from "@/lib/utils";

import { Toggle } from "@/components/ui/toggle";

interface ToggleProps {
  isDark: boolean;
  toggleButton: () => void;
  className?: string;
}

export default function ToggleButton({
  isDark,
  toggleButton,
  className,
}: ToggleProps) {
  return (
    <Toggle
      className={cn(
        "relative w-14 h-7 rounded-full p-0.5 transition-colors bg-[#F3F4F6] dark:bg-primary-dark hover:opacity-80",
        className
      )}
      pressed={isDark}
      onPressedChange={toggleButton}
    >
      {isDark ? <Moon /> : <Sun />}
    </Toggle>
  );
}
