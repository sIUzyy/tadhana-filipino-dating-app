"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";

import MessageCard from "./message-card";
import MessageCardSkeleton from "./message-card-skeleton";

export default function MessageSection() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchMatches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/v1/match", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMatches(res.data.matches);
      } catch (err) {
        console.error(err);
        setError("Failed to load matches.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [user]);

  if (isLoading) {
    return <MessageCardSkeleton />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (matches.length === 0) {
    return (
      <div className="text-center text-sm">
        Messages will appear once you find your tadhana.
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <MessageCard data={matches} />
    </div>
  );
}
