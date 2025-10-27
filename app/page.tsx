"use client";

// react
import React from "react";

// auth-context
import { useAuth } from "@/context/auth-context";

// show these components when user is not logged in
import Hero from "@/components/hero/hero-section";
import AboutSection from "@/components/about/about-section";
import FeatureSection from "@/components/feature/feature-section";
import TestimonialSection from "@/components/testimonial/testimonial-section";

// show this dashboard if user is logged in
import Dashboard from "./dashboard/page";

export default function Home() {
  const { user } = useAuth();

  // If user exists, show dashboard instead of landing page
  if (user) return <Dashboard />;

  return (
    <React.Fragment>
      <Hero />
      <AboutSection />
      <TestimonialSection />
      <FeatureSection />
    </React.Fragment>
  );
}
