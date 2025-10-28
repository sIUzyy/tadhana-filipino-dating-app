// react-next
import Image from "next/image";

// lib
import { MapPin } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SwipeCard({ person, isTop, handleSwipe }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  return (
    <motion.div
      className="absolute w-full h-full rounded-2xl overflow-hidden shadow-xl"
      style={{ x, rotate, opacity, zIndex: isTop ? 1 : 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 150) handleSwipe(person.id, true);
        else if (info.offset.x < -150) handleSwipe(person.id, false);
        else x.set(0);
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background Image */}
      <Image
        src={person.image}
        alt={person.name}
        fill
        className="object-cover"
        priority
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h2 className="text-2xl font-semibold">{person.name}</h2>
        <p className="flex items-center gap-1 text-sm text-gray-200 ">
          <MapPin size={15} />
          {person.location}
        </p>
        {person.bio && (
          <p className="text-sm text-gray-300 mt-3 line-clamp-2">
            {person.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}
