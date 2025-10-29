import Link from "next/link";

import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DiscoveryNoMoreProps {
  isLoading: boolean;
  fetchDiscovery: () => void;
}

export default function DiscoveryNoMore({
  isLoading,
  fetchDiscovery,
}: DiscoveryNoMoreProps) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center  text-center">
      <h1 className="font-extrabold text-2xl">
        No more hearts to steal right now 💔
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        But who knows? Your next match might be closer than you think. Try to
        adjust your{" "}
        <Link
          href={"/dashboard/profile/preferences"}
          className="text-vibrant-red underline underline-offset-3"
        >
          preferences
        </Link>{" "}
        to discover new faces.
      </p>
      <Button
        variant="outline"
        className="w-full flex items-center mt-5"
        onClick={fetchDiscovery}
      >
        {isLoading ? "Refreshing" : "Refresh"} <RefreshCcw size={20} />
      </Button>
    </div>
  );
}
