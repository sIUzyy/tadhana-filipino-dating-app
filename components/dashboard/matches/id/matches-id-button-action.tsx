"use client";

// react-next
import { useRouter } from "next/navigation";

// shadcn components
import { Button } from "@/components/ui/button";

export default function MatchesIdButtons() {
  // navigation
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button
        onClick={() => router.push("/dashboard/messages")}
        className="w-full bg-vibrant-red hover:bg-vibrant-hover hoverEffect"
      >
        Send a message
      </Button>

      <Button
        onClick={() => router.push("/dashboard/matches")}
        className="w-full "
        variant={"secondary"}
      >
        Later
      </Button>
    </div>
  );
}
