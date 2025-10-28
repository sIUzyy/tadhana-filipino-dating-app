"use client";

// react-next
import Link from "next/link";

// auth-context
import { useAuth } from "@/context/auth-context";

// component
import DashboardTitle from "../dashboard-title";

export default function DiscoveryHeader() {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="mb-16 w-full text-center">
      <DashboardTitle
        text="Start Finding Your Tadhana,"
        details="Swipe right kung bet mo, left kung next!"
        label={user?.name}
        className="text-center mb-5"
      />

      <Link
        href={"/dashboard/profile/preferences"}
        className="text-sm border py-2 px-6 rounded hover:text-vibrant-red"
      >
        Edit Preference
      </Link>
    </div>
  );
}
