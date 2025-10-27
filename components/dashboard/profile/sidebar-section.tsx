"use client";

// next
import Link from "next/link";

// icons
import { User, Settings2 } from "lucide-react";

import { usePathname } from "next/navigation";
export default function SidebarSection() {
  // track the path
  const pathname = usePathname();
  return (
    <div className=" border border-[#EAEAEA] dark:border-[#27272C] dark:bg-[#18181B] p-4 rounded-md w-full transition-all h-fit md:w-1/3 ">
      {/* header section */}
      <div>
        <h1 className="font-bold text-2xl tracking-tighter">Account</h1>
        <p className="text-gray-500 text-sm">Manage your account info.</p>
      </div>

      {/* links section */}
      <div className="mt-5 space-y-2">
        <Link
          href="/dashboard/profile"
          className={`flex items-center justify-center gap-2 py-2 w-full rounded-md 
              ${
                pathname === "/dashboard/profile"
                  ? "bg-[#F3F4F6] dark:bg-primary-dark"
                  : "border border-[#EAEAEA] dark:border-[#27272C]"
              }
              transition-all`}
        >
          <User size={20} />
          <h1 className="font-light text-pretty text-sm">Profile</h1>
        </Link>

        <Link
          href="/dashboard/profile/preferences"
          className={`flex items-center justify-center gap-2 py-2 w-full rounded-md 
              ${
                pathname === "/dashboard/profile/preferences"
                  ? "bg-[#F3F4F6] dark:bg-primary-dark"
                  : "border border-[#EAEAEA] dark:border-[#27272C]"
              }
              transition-all`}
        >
          <Settings2 size={20} />
          <h1 className="font-light text-pretty text-sm">Preferences</h1>
        </Link>
      </div>
    </div>
  );
}
