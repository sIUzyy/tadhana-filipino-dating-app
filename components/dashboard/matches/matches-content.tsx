"use client";

// react-next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// component
import MatchesCard from "./matches-card";

// lib
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import MatchesSkeleton from "./matches-skeleton";

export default function MatchesContent() {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  // navigation
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const token = user?.token || localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/match`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMatches(res.data.matches || []);
        // console.log(res.data.matches);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load matches.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchMatches();
  }, [user]);

  const handleUnmatch = async (matchId: string) => {
    if (!user) return;

    const token = user?.token || localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/match/unmatch/${matchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove the unmatched user from the state
      setMatches((prev) => prev.filter((m) => m.matchId !== matchId));
      toast.success("User unmatched successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to unmatch user.");
    }
  };

  return (
    <div>
      {isLoading ? (
        <MatchesSkeleton />
      ) : matches.length === 0 ? (
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="text-center"
        >
          Still looking? Match naaaaAaaaAaa
        </Button>
      ) : (
        <MatchesCard data={matches} onUnmatch={handleUnmatch} />
      )}
    </div>
  );
}
