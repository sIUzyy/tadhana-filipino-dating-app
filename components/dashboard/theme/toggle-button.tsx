"use client";

// icons
import { Sun, Moon } from "lucide-react";

// lib
import { cn } from "@/lib/utils";

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
    <div className={cn("flex items-center justify-center", className)}>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          checked={isDark}
          onChange={toggleButton}
          type="checkbox"
          className="sr-only peer"
        />

        {/* switch background */}
        <div className="w-13 h-7 bg-slate-300 rounded-full peer-checked:bg-[#4B5563] transition-colors duration-300" />

        {/* switch knob with icons */}
        <span className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white text-primary-dark transition-all duration-300 peer-checked:translate-x-6 peer-checked:text-primary-dark">
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </span>
      </label>
    </div>
  );
}
