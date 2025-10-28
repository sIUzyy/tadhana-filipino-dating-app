"use client";

// auth-context
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";

// component
import Container from "../containers/container";
import FooterBrandingLogo from "./footer-branding-logo";
import FooterDisplayLinks from "./footer-display-links";

// links-data
const linkSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/#about" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Facebook", href: "/#hero" },
      { label: "Instagram", href: "/#hero" },
      { label: "TikTok", href: "/#hero" },
      { label: "X", href: "/#hero" },
    ],
  },
  {
    title: "Get the App",
    links: [
      { label: "Google Play", href: "/#hero" },
      { label: "App Store", href: "/#hero" },
    ],
  },
];

export default function Footer() {
  // auth-context
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);

  // Prevent footer from rendering until after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // wait until client-side

  // hide the footer is user exist
  if (user) return null;

  return (
    <footer className="bg-black text-gray-500">
      <Container>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 ">
          <FooterBrandingLogo />
          <div className="flex flex-wrap justify-between w-full gap-5 md:w-[45%] ">
            {linkSections.map((section, index) => (
              <FooterDisplayLinks data={section} key={index} />
            ))}
          </div>
        </div>
        <p className="py-4 text-center text-sm text-gray-500/80">
          2025 © Tadhana. All Right Reserved.
        </p>
      </Container>
    </footer>
  );
}
