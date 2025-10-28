"use client";

// react-next
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// auth-context
import { useAuth } from "@/context/auth-context";

// show these components when user is not logged in
import Hero from "@/components/hero/hero-section";
import AboutSection from "@/components/about/about-section";
import FeatureSection from "@/components/feature/feature-section";
import TestimonialSection from "@/components/testimonial/testimonial-section";

// show this dashboard if user is logged in
import Dashboard from "./dashboard/page";

// route
import PublicRoute from "@/components/routes/public-route";

export default function Home() {
  // auth-context
  const { user } = useAuth();

  // navigation
  const router = useRouter();

  // if logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <PublicRoute>
      <Hero />
      <AboutSection />
      <TestimonialSection />
      <FeatureSection />
    </PublicRoute>
  );
}
