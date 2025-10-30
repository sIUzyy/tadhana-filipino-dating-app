"use client";

// react-next
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";

// components
import MessageCard from "./message-card";
import MessageEmpty from "./message-empty";
import ClientError from "@/components/client-error";
import MessageCardSkeleton from "./message-card-skeleton";

// data type
type MatchPreferences = {
  ageRange: {
    min: number;
    max: number;
  };
  gender: string;
};

// data type
type MatchUser = {
  _id: string;
  name: string;
  age: number;
  bio: string;
  email: string;
  gender: string;
  location: string;
  matchId: string;
  photo?: string;
  preferences: MatchPreferences;
};

export default function MessageSection() {
  // auth-context
  const { user } = useAuth();

  // store the matches data
  const [matches, setMatches] = useState<MatchUser[]>([]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // error state
  const [error, setError] = useState<string | null>(null);

  // fetch the matches data
  useEffect(() => {
    // if no user. stop.
    if (!user) return;

    const fetchMatches = async () => {
      // loading and error state
      setIsLoading(true);
      setError(null);
      try {
        // request to the backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/match`,
          {
            headers: { Authorization: `Bearer ${user.token}` }, // jwt token
          }
        );

        // store the data to setMatches
        setMatches(response.data.matches);
      } catch (err) {
        setError("Failed to load matches. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [user]);

  // if data is loading, show this component
  if (isLoading) {
    return <MessageCardSkeleton />;
  }

  // if there's an error, show this
  if (error) {
    return <ClientError error={error} />;
  }

  // if there's no match, show this component
  if (matches.length === 0) {
    return <MessageEmpty />;
  }

  return (
    <div className="mx-auto">
      <MessageCard data={matches} />
    </div>
  );
}
