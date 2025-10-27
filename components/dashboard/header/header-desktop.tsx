"use client";

// next
import Link from "next/link";

// lib
import { usePathname } from "next/navigation";

// links-data
import { dashboardLinks } from "@/constants/data";

// component
import ToggleButton from "../theme/toggle-button";

// theme-context
import { useTheme } from "@/context/theme-context";

export default function HeaderDesktop() {
  // track the path
  const pathname = usePathname();

  // theme-context
  const { isDark, toggleButton } = useTheme();

  return (
    <div className="flex items-center">
      {/* links */}
      <div className="hidden md:flex items-center space-x-6 ">
        {dashboardLinks.map((item, idx) => {
          // etermine active state
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={idx}
              href={item.href}
              className={`font-medium hover:text-vibrant-red hoverEffect ${
                isActive ? "text-vibrant-red font-semibold transition-all" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* toggle-button (light-dark mode) */}
      <ToggleButton
        className="hidden md:flex md:ml-6"
        isDark={isDark}
        toggleButton={toggleButton}
      />
    </div>
  );
}
