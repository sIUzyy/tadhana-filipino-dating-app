"use client";

// react
import React, { useState } from "react";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// theme-context
import { useTheme } from "@/context/theme-context";

// links-data
import { dashboardLinks } from "@/constants/data";

// icons
import { TextAlignJustify } from "lucide-react";

// components
import ToggleButton from "../theme/toggle-button";

export default function HeaderMobile() {
  // state for menu bar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // track the menu bar
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // theme-context
  const { isDark, toggleButton } = useTheme();

  // track the path
  const pathname = usePathname();

  return (
    <React.Fragment>
      {/* menu bar */}
      <button
        aria-label="menu-btn"
        type="button"
        className="menu-btn inline-block md:hidden active:scale-90 transition-all"
        onClick={toggleMobileMenu}
      >
        <TextAlignJustify />
      </button>

      {/* links (check if menu is open) */}
      {isMobileMenuOpen && (
        <div className="mobile-menu z-10 absolute top-[70px] left-0 w-full bg-white dark:bg-[#18181B] transition-all shadow-sm p-6 md:hidden">
          <div className="flex flex-col space-y-4 text-sm">
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
                    isActive
                      ? "text-vibrant-red font-semibold transition-all"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/*toggle-button (light-dark mode) */}
          <ToggleButton
            className="w-fit mt-10"
            isDark={isDark}
            toggleButton={toggleButton}
          />
        </div>
      )}
    </React.Fragment>
  );
}
