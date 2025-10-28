"use client";

// react-next
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // auth-context
  const { user } = useAuth();

  // navigation
  const router = useRouter();

  // check the user
  const [checking, setChecking] = useState(true);

  // check if there's a user
  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    } else {
      setChecking(false);
    }
  }, [user, router]);

  if (checking) return null; // prevents flicker during redirect
  return <>{children}</>;
}
