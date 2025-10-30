"use client";

// data type
interface Match {
  _id: string;
  matchId: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  location: string;
  bio: string;
  photo: string;
  preferences: {
    ageRange: {
      min: number;
      max: number;
    };
    gender: string;
  };
}

// react-next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// component
import MatchesCard from "./matches-card";
import MatchesEmpty from "./matches-empty";
import MatchesSkeleton from "./matches-skeleton";
import ClientError from "@/components/client-error";

// lib
import axios from "axios";
import toast from "react-hot-toast";

export default function MatchesContent() {
  // auth-context
  const { user } = useAuth();

  // state to store the matches data
  const [matches, setMatches] = useState<Match[]>([]);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [error, setError] = useState<string | null>(null);

  // navigation
  const router = useRouter();

  // fetch the matches from the backend
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // get the token from user auth or in local storage
        const token = user?.token || localStorage.getItem("token");

        // request to the backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/match`,
          {
            headers: { Authorization: `Bearer ${token}` }, // jwt token
          }
        );
        setMatches(response.data.matches || []);
      } catch (err) {
        setError("Something went wrong while loading your matches.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchMatches();
  }, [user]);

  // handle to unmatch the user
  const handleUnmatch = async (matchId: string) => {
    // check if user exist
    if (!user) return;

    // check the token of user
    const token = user?.token || localStorage.getItem("token");

    try {
      // request to the backend
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/match/unmatch/${matchId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // jwt token
        }
      );

      // remove the unmatched user from the state
      setMatches((prev) => prev.filter((m) => m.matchId !== matchId));
      toast.success("You’ve successfully unmatched this user.");

      // refresh the page
      router.refresh();
    } catch (err) {
      toast.error("Failed to unmatch the user. Please try again.");
    }
  };

  // if there's an error show this component
  if (error) return <ClientError error={error} />;

  // if loading, show this component
  if (isLoading) return <MatchesSkeleton />;

  // if matches is zero, show this component
  if (matches.length === 0) return <MatchesEmpty />;

  // otherwise, show this card that hold all the data
  return <MatchesCard data={matches} onUnmatch={handleUnmatch} />;
}
