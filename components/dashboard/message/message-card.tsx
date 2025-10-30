// react-next
import Link from "next/link";

// shadcn components
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

// type data
type MatchData = {
  _id: string;
  matchId: string;
  name: string;
  age: number;
  bio: string;
  email: string;
  gender: string;
  location: string;
  photo?: string;
  preferences?: {
    ageRange?: {
      min?: number;
      max?: number;
    };
    gender?: string;
  };
};

type MessageCardProps = {
  data: MatchData[];
};

export default function MessageCard({ data }: MessageCardProps) {
  return (
    <div className="bg-[#F3F4F6] dark:bg-[#18181B] rounded-lg mx-auto md:max-w-md">
      {data.map((info, idx) => (
        <Link
          href={`/dashboard/messages/${info.matchId}`}
          key={idx}
          className="flex items-center gap-2 py-3 px-4 hover:bg-primary-white hover:dark:bg-primary-dark/50"
        >
          <Avatar>
            <AvatarImage
              src={
                info.photo
                  ? `${
                      process.env.NEXT_PUBLIC_API_BASE_URL
                    }/${info.photo.replace(/\\/g, "/")}`
                  : undefined
              }
              className="w-14 h-14 rounded-full"
            />
            <AvatarFallback className="w-14 h-14 rounded-full">
              {info.name?.[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-base font-semibold">
              {info.name}, {info.age}
            </h1>
            <p className="text-sm text-gray-500">
              Start a conversation and see where it goes.
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
