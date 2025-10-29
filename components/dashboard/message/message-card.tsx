import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

export default function MessageCard({ data }: any) {
  console.log(data);
  return (
    <div className="bg-[#F3F4F6] dark:bg-[#18181B] rounded-lg mx-auto md:max-w-md">
      {data.map((info: any, idx: number) => (
        <Link
          href={`/dashboard/messages/${info.matchId}`}
          key={idx}
          className="flex items-center gap-4 py-3 px-4 hover:bg-primary-white hover:dark:bg-primary-dark/50"
        >
          <Avatar>
            <AvatarImage
              src={
                info.photo
                  ? `http://localhost:5000/${info.photo.replace(/\\/g, "/")}`
                  : undefined
              }
              className="w-14 h-14 rounded-full"
            />
            <AvatarFallback>{info.name?.[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-base font-semibold">{info.name}</h1>
            <p className="text-sm text-gray-500">
              Start a conversation and see where it goes
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
