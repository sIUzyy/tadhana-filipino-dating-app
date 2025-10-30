// shadcn components
import { Skeleton } from "@/components/ui/skeleton";

export default function MessageCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-lg mx-auto md:max-w-md">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 py-3 px-4 animate-pulse"
        >
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
