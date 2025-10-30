"use client";

// react-next
import { useAuth } from "@/context/auth-context";
import { useState, useEffect, useCallback } from "react";

// lib
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// components
import SwipeCard from "./discovery-swiping-card";
import DiscoveryNoMore from "./discovery-no-more";
import { Skeleton } from "@/components/ui/skeleton";
import DiscoveryXHeartBtn from "./discovery-x-heart-btn";

// data type
type Person = {
  id: string;
  name: string;
  gender: string;
  location: string;
  bio: string;
  image?: string;
};

// data types (formattedUsers)
type ApiUser = {
  _id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  photo?: string;
};

export default function DiscoverySwipingMechanics() {
  // auth-context
  const { user } = useAuth();

  // store the data of discovery
  const [people, setPeople] = useState<Person[]>([]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // fetch the discovery data
  const fetchDiscovery = useCallback(async () => {
    // check if there's a user and token
    if (!user?.token) return;

    // loading state
    setIsLoading(true);
    try {
      // request to the backend
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/discovery`,
        {
          headers: { Authorization: `Bearer ${user.token}` }, // jwt token
        }
      );

      const formattedUsers = response.data.users.map((u: ApiUser) => ({
        id: u._id,
        name: `${u.name}, ${u.age}`,
        gender: u.gender,
        location: u.location,
        bio: u.bio,
        image: u.photo,
      }));

      // extract the response data to setPeople state
      setPeople(formattedUsers);
    } catch (err) {
      toast.error("Failed to load discovery users. Please try again later");
    } finally {
      setIsLoading(false);
    }
  }, [user?.token]);

  // load discovery on mount
  useEffect(() => {
    if (user) fetchDiscovery();
  }, [user, fetchDiscovery]);

  // re-render when preferences update (gender, age range, etc.)
  useEffect(() => {
    if (user?.preferences) {
      fetchDiscovery();
    }
  }, [user?.preferences, fetchDiscovery]);

  // handle swipe action
  const handleSwipe = async (targetUserId: string, liked: boolean) => {
    // remove the swiped user from the list
    setPeople((prev) => prev.filter((p) => p.id !== targetUserId));

    try {
      // send the swipe action to the backend
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/discovery/swipe`,
        { targetUserId, liked },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      // the server responds with newMatch: true if both users liked each other.
      if (res.data.newMatch) {
        toast.success("It’s a match! Time to make your move.");
      }
    } catch (err) {
      toast.error("Something went wrong while swiping. Try again later.");
    }
  };

  // if loading is true, return this component
  if (isLoading) return <Skeleton className="w-[300px] h-[400px] rounded-xl" />;

  // if there's no people to discover, return this component
  if (people.length === 0)
    return (
      <DiscoveryNoMore isLoading={isLoading} fetchDiscovery={fetchDiscovery} />
    );

  return (
    <div>
      <div className="relative w-[320px] h-[460px] flex items-center justify-center">
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
      </div>

      {people.length !== 0 && !isLoading && (
        <DiscoveryXHeartBtn people={people} handleSwipe={handleSwipe} />
      )}
    </div>
  );
}
