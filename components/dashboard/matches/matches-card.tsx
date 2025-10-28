import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      {data.map((match, idx) => (
        <Card key={idx}>
          <CardHeader className="flex ">
            <Image
              src={match.photo}
              alt={match.name}
              width={80}
              height={80}
              className="rounded-full mr-2"
            />

            <div>
              <CardTitle>
                {match.name}, {match.age}
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {match.bio}
              </CardDescription>

              <div className="flex flex-col lg:flex-row gap-2 mt-4">
                <Button variant={"secondary"}>Send a Message</Button>
                <Button
                  variant={"secondary"}
                  onClick={() => onUnmatch(match.matchId)}
                >
                  Unmatched
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
