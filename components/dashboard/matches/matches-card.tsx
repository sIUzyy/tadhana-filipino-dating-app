"use client";

// react-next
import { useRouter } from "next/navigation";
import { useState } from "react";

// image
import placeholder_img from "../../../images/image-placeholder.jpg";

// shadcn components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// component
import MatchesConfirmModal from "./matches-confirm-modal";

// data type
type Match = {
  _id: string;
  name: string;
  age: number;
  bio: string;
  photo: string;
  matchId: string;
};

// data / function from matches-contenxt.tsx
type MatchesCardProps = {
  data: Match[];
  onUnmatch: (matchId: string) => void;
};

export default function MatchesCard({ data, onUnmatch }: MatchesCardProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveClick = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedMatch) {
      onUnmatch(selectedMatch.matchId);
      setIsModalOpen(false);
      setSelectedMatch(null);
    }
  };

  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((match) => {
          return (
            <Card key={match._id}>
              <CardHeader className="flex ">
                <Avatar className="w-16 h-16 border border-gray-300 dark:border-gray-700">
                  <AvatarImage
                    src={
                      match.photo && match.photo.trim() !== ""
                        ? `${
                            process.env.NEXT_PUBLIC_API_BASE_URL
                          }/${match.photo.replace(/\\/g, "/")}`
                        : placeholder_img.src
                    }
                    alt={`${match.name}'s profile photo`}
                  />
                  <AvatarFallback>{match.name?.[0] || "?"}</AvatarFallback>
                </Avatar>

                <div>
                  <CardTitle>
                    {match.name}, {match.age}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 mt-2">
                    {match.bio}
                  </CardDescription>

                  <div className="mt-4  flex flex-col lg:flex-row w-full  items-center gap-2 ">
                    <Button
                      variant={"outline"}
                      className="w-full lg:w-1/2"
                      onClick={() =>
                        router.push(`/dashboard/matches/${match._id}`)
                      }
                    >
                      View Profile
                    </Button>

                    <Button
                      className="w-full lg:w-1/2 bg-vibrant-red hover:bg-vibrant-hover hoverEffect text-white "
                      onClick={() => handleRemoveClick(match)}
                    >
                      Remove Match
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {selectedMatch && (
        <MatchesConfirmModal
          isOpen={isModalOpen}
          title={`Unmatch ${selectedMatch.name}?`}
          message="Are you sure? Tadhana doesn’t usually give second chances."
          onConfirm={handleConfirmRemove}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
