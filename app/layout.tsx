// next-seo
import type { Metadata } from "next";

// style
import "./globals.css";

// components
import Footer from "@/components/footer/footer";

// auth-context
import { AuthProvider } from "@/context/auth-context";

// seo
export const metadata: Metadata = {
  title: {
    template: "%s - Filipino Dating App for Meaningful Connections",
    default: "Tadhana - Filipino Dating App for Meaningful Connections",
  },
  description:
    "Tadhana is a Filipino dating app designed to help people find genuine love and lasting relationships. Connect with Filipino singles who share your values, culture, and passion for meaningful connections.",
  keywords: [
    "Filipino dating app",
    "Pinoy singles",
    "dating in the Philippines",
    "Filipino relationships",
    "online dating Philippines",
    "Tadhana app",
    "find love online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <AuthProvider>
        <body>
          <main>{children}</main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
