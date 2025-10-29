import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import placeholder_img from "../../../images/image-placeholder.jpg";

type Match = {
  _id: string;
  name: string;
  age: number;
  bio: string;
  photo: string;
  matchId: string;
};

type MatchesCardProps = {
  data: Match[];
  onUnmatch: (matchId: string) => void;
};

export default function MatchesCard({ data, onUnmatch }: MatchesCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {data.map((match) => {
        return (
          <Card key={match._id}>
            <CardHeader className="flex ">
              <Avatar className="w-24 h-24 border border-gray-300 dark:border-gray-700">
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

                <Button
                  className="mt-4 w-full"
                  variant="destructive"
                  onClick={() => onUnmatch(match.matchId)}
                >
                  Unmatch
                </Button>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
