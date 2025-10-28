"use client";

// react-next
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";
import toast from "react-hot-toast";
import { X, Heart } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "./discovery-swiping-card";
import { Skeleton } from "@/components/ui/skeleton";

// image
import no_match_image from "../../../images/no-match.webp";

export default function DiscoverySwipingMechanics() {
  // auth-context
  const { user } = useAuth();

  // navigation
  const router = useRouter();

  // store the discover data
  const [people, setPeople] = useState<any[]>([]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // fetch the discovery data
  useEffect(() => {
    const fetchDiscovery = async () => {
      setIsLoading(true);
      try {
        const token = user?.token || localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/discovery`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const formattedUsers = res.data.users.map((u: any) => ({
          id: u._id,
          name: `${u.name}, ${u.age}`,
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
    };

    if (user) fetchDiscovery();
  }, [user]);

  // function for swiping
  const handleSwipe = async (targetUserId: string, liked: boolean) => {
    // remove the card from frontend
    setPeople((prev) => prev.filter((p) => p.id !== targetUserId));

    try {
      const token = user?.token || localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/discovery/swipe`,
        { targetUserId, liked },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.matches?.length) {
        toast.success("Match made! Go shoot your shot!");
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
          <div className="flex flex-col gap-2 items-center justify-center ">
            <Image
              src={no_match_image}
              alt="no-match-image"
              width={250}
              className=" rounded-2xl"
              loading="lazy"
            />
            <Button
              variant={"link"}
              className="w-full"
              onClick={() => router.push("/dashboard/matches")}
            >
              View Matches
            </Button>
          </div>
        ) : (
          <>
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
          </>
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
