// react-next
import Link from "next/link";

// icons
import { RefreshCcw } from "lucide-react";

// components
import { Button } from "@/components/ui/button";

// data type
interface DiscoveryNoMoreProps {
  isLoading: boolean;
  fetchDiscovery: () => void;
}

export default function DiscoveryNoMore({
  isLoading,
  fetchDiscovery,
}: DiscoveryNoMoreProps) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center max-w-sm bg-[#F3F4F6] dark:bg-[#18181B] px-4 py-6 rounded-lg">
      <h1 className="font-extrabold text-2xl">
        No more hearts to steal right now 💔
      </h1>
      <p className="text-sm  mt-2">
        But who knows? Your next match might be closer than you think. Try to
        adjust your{" "}
        <Link
          href={"/dashboard/profile/preferences"}
          title="Customize your preferences"
          className="text-indigo-500 underline underline-offset-2 hover:opacity-80"
        >
          preferences
        </Link>{" "}
        to discover new faces.
      </p>
      <Button
        variant="outline"
        title="Refresh Page"
        className="w-full flex items-center mt-5"
        onClick={fetchDiscovery}
      >
        {isLoading ? "Refreshing" : "Refresh"} <RefreshCcw size={20} />
      </Button>
    </div>
  );
}
