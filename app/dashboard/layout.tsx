"use client"; // marks this component as a client Component in Next.js

// react
import { useEffect, useState } from "react";

// components
import HeaderSection from "@/components/dashboard/header/header-section";

// theme-context
import { ThemeProvider } from "@/context/theme-context";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // state to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  // this helps prevent hydration mismatches between server and client
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if not yet mounted, don't render anything
  if (!mounted) return null;

  return (
    <ThemeProvider>
      <HeaderSection />
      <main>{children}</main>
    </ThemeProvider>
  );
}
