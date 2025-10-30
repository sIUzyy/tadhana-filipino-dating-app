// icons
import { X, Heart } from "lucide-react";

// data type
type Person = {
  id: string;
  name: string;
  gender: string;
  location: string;
  bio: string;
  image?: string;
};

// data type
interface DiscoveryXHeartBtnProps {
  people: Person[];
  handleSwipe: (targetUserId: string, liked: boolean) => void;
}

export default function DiscoveryXHeartBtn({
  people,
  handleSwipe,
}: DiscoveryXHeartBtnProps) {
  // safety check
  if (!people.length) return null;

  const topUserId = people[people.length - 1].id;

  return (
    <div className="flex justify-center items-center gap-5 mt-5">
      <button onClick={() => handleSwipe(topUserId, false)}>
        <X className="hover:opacity-80" size={25} />
      </button>
      <button onClick={() => handleSwipe(topUserId, true)}>
        <Heart className="text-vibrant-red hover:opacity-80" size={25} />
      </button>
    </div>
  );
}
