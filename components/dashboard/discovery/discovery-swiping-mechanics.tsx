"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "./discovery-swiping-card";
import { Skeleton } from "@/components/ui/skeleton";

import DiscoveryNoMore from "./discovery-no-more";
import DiscoveryXHeartBtn from "./discovery-x-heart-btn";

export default function DiscoverySwipingMechanics() {
  const { user } = useAuth();
  const [people, setPeople] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🧠 Move fetchDiscovery OUTSIDE so we can reuse it
  const fetchDiscovery = useCallback(async () => {
    if (!user?.token) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/discovery`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const formattedUsers = res.data.users.map((u: any) => ({
        id: u._id,
        name: `${u.name}, ${u.age}`,
        gender: u.gender,
        location: u.location,
        bio: u.bio,
        image: u.photo,
      }));

      setPeople(formattedUsers);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load discovery users.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.token]);

  // 🟢 Load discovery on mount
  useEffect(() => {
    if (user) fetchDiscovery();
  }, [user, fetchDiscovery]);

  // 🟡 Re-run when preferences update (gender, age range, etc.)
  useEffect(() => {
    if (user?.preferences) {
      fetchDiscovery();
    }
  }, [user?.preferences, fetchDiscovery]);

  // ❤️ Handle swipe action
  const handleSwipe = async (targetUserId: string, liked: boolean) => {
    setPeople((prev) => prev.filter((p) => p.id !== targetUserId));

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/discovery/swipe`,
        { targetUserId, liked },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      if (res.data.newMatch) {
        toast.success("Match made. Go shoot your shot!");
      }
    } catch (err) {
      toast.error("Something went wrong while swiping. Try again.");
    }
  };

  return (
    <div>
      <div className="relative w-[320px] h-[460px] flex items-center justify-center">
        {isLoading ? (
          <Skeleton className="w-[250px] h-[400px] rounded-xl" />
        ) : people.length === 0 ? (
          <DiscoveryNoMore
            isLoading={isLoading}
            fetchDiscovery={fetchDiscovery}
          />
        ) : (
          <AnimatePresence>
            {people.map((person, index) => (
              <SwipeCard
                key={person.id}
                person={person}
                handleSwipe={handleSwipe}
                isTop={index === people.length - 1}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {people.length !== 0 && !isLoading && (
        <DiscoveryXHeartBtn people={people} handleSwipe={handleSwipe} />
      )}
    </div>
  );
}
