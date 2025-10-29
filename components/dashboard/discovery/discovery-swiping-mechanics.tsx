"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import toast from "react-hot-toast";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "./discovery-swiping-card";
import { Skeleton } from "@/components/ui/skeleton";
import no_match_image from "../../../images/no-match.webp";

export default function DiscoverySwipingMechanics() {
  const { user } = useAuth();
  const router = useRouter();
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
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              src={no_match_image}
              alt="no-match-image"
              width={250}
              className="rounded-2xl"
              loading="lazy"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard/matches")}
            >
              View Matches
            </Button>
          </div>
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
        <div className="flex justify-center items-center gap-5 mt-5">
          <button
            onClick={() => handleSwipe(people[people.length - 1]?.id, false)}
          >
            <X className="hover:opacity-80" size={25} />
          </button>
          <button
            onClick={() => handleSwipe(people[people.length - 1]?.id, true)}
          >
            <Heart className="text-vibrant-red hover:opacity-80" size={25} />
          </button>
        </div>
      )}
    </div>
  );
}
