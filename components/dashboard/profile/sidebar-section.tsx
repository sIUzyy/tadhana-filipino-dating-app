"use client";

// react-next
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// icons
import { User, Settings2 } from "lucide-react";

// component
import { Button } from "@/components/ui/button";
import DashboardTitle from "../dashboard-title";

export default function SidebarSection() {
  // auth-context
  const { logout } = useAuth();
  // track the path
  const pathname = usePathname();

  // navigation
  const router = useRouter();

  // logout function from context and redirect to signin page
  const handleLogout = () => {
    logout();
    router.replace("/signin");
  };
  return (
    <div className="flex flex-col justify-between border border-[#EAEAEA] dark:border-[#27272C] dark:bg-[#18181B] p-4 rounded-md w-full transition-all h-[280px] md:w-1/3 ">
      <div>
        {/* header section */}
        <DashboardTitle
          text="Account"
          details="Manage your account information"
        />

        {/* links section */}
        <div className=" space-y-2">
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
      <Button onClick={handleLogout} variant={"outline"} className="w-full">
        Sign out
      </Button>
    </div>
  );
}
