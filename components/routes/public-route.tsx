"use client";

// react-next
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export default function PublicRoute({
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
    if (user) {
      router.replace("/dashboard");
    } else {
      setChecking(false);
    }
  }, [user, router]);

  if (checking) return null;
  return <>{children}</>;
}
