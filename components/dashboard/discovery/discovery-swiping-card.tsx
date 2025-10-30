// react-next
import Image from "next/image";

// lib
import { MapPin, Venus, Mars, VenusAndMars } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// image-src
import placeholder_img from "../../../images/image-placeholder.jpg";

// data type
export type Person = {
  id: string;
  name: string;
  gender: string;
  location: string;
  bio: string;
  image?: string;
};

// data type
interface SwipeCardProps {
  person: Person;
  isTop: boolean;
  handleSwipe: (targetUserId: string, liked: boolean) => void;
}

export default function SwipeCard({
  person,
  isTop,
  handleSwipe,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const imageSrc =
    person?.image && person.image.trim() !== ""
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${person.image.replace(
          /\\/g,
          "/"
        )}`
      : placeholder_img.src;

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
      {/* background image */}
      <Image
        src={imageSrc}
        alt={person.name}
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* gradient overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h2 className="text-2xl font-semibold">{person.name}</h2>

        <div className="flex gap-1 mt-1 mb-4">
          <p className="flex items-center gap-1 text-xs  border border-vibrant-red  py-1 px-5 rounded-full ">
            <MapPin size={15} />
            {person.location}
          </p>
          <p className="flex items-center gap-1 text-xs  border border-vibrant-red py-1 px-5 rounded-full  ">
            {person.gender === "Female" && (
              <>
                <Venus size={15} /> {person.gender}
              </>
            )}

            {person.gender === "Male" && (
              <>
                <Mars size={15} /> {person.gender}
              </>
            )}

            {person.gender === "Any" && (
              <>
                <VenusAndMars size={15} /> {person.gender}
              </>
            )}
          </p>
        </div>

        {person.bio && (
          <p className="text-sm text-gray-300 line-clamp-2">{person.bio}</p>
        )}
      </div>
    </motion.div>
  );
}
