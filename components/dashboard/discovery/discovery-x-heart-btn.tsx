import { X, Heart } from "lucide-react";
interface DiscoveryXHeartBtnProps {
  people: any[];
  handleSwipe: (targetUserId: string, liked: boolean) => void;
}

export default function DiscoveryXHeartBtn({
  people,
  handleSwipe,
}: DiscoveryXHeartBtnProps) {
  if (!people.length) return null; // safety check

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
