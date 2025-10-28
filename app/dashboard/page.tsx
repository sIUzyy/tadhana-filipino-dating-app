"use client";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/containers/container";

import { useAuth } from "@/context/auth-context";

// fake user data
const users = [
  {
    id: 1,
    name: "Mia, 23",
    bio: "Loves coffee, cats, and late-night convos 🌙",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Rico, 25",
    bio: "Traveler ✈️ | Music lover 🎶 | Foodie 🍜",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: 3,
    name: "Ava, 22",
    bio: "Into art and cozy bookstores 📚✨",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Dashboard() {
  const [people, setPeople] = useState(users);

  const { user } = useAuth();
  console.log(user);

  const removeCard = (id: number) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Container className="py-5  flex flex-col items-center justify-center">
      {/* header section */}
      <div className="text-center mb-5">
        <h1 className="font-bold text-2xl tracking-tighter">
          Start Finding Your <span className="text-vibrant-red">tadhana</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Swipe right kung bet mo, left kung next!
        </p>
      </div>

      {/* swipe section */}
      <div className="relative w-[320px] h-[460px]">
        <AnimatePresence>
          {people.map((person, index) => (
            <SwipeCard
              key={person.id}
              person={person}
              onSwipe={() => removeCard(person.id)}
              isTop={index === people.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* buttons for manual testing */}
      <div className="flex gap-4 mt-6">
        <Button variant="outline" className="rounded-full p-4">
          <X className="text-red-500" />
        </Button>
        <Button variant="outline" className="rounded-full p-4">
          <Heart className="text-green-500" />
        </Button>
      </div>
    </Container>
  );
}

function SwipeCard({ person, onSwipe, isTop }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  return (
    <motion.div
      className="absolute w-full h-full bg-white dark:bg-[#18181B] rounded-2xl shadow-lg overflow-hidden flex flex-col"
      style={{ x, rotate, opacity, zIndex: isTop ? 1 : 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 150) {
          onSwipe(); // swipe right
        } else if (info.offset.x < -150) {
          onSwipe(); // swipe left
        } else {
          x.set(0); // reset position
        }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Image
        src={person.image}
        alt={person.name}
        width={320}
        height={300}
        className="object-cover w-full h-3/4"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{person.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{person.bio}</p>
      </div>
    </motion.div>
  );
}
