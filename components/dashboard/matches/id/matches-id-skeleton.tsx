// components
import Container from "@/components/containers/container";

// shadcn components
import { Skeleton } from "@/components/ui/skeleton";

export default function MatchesIdSkeleton() {
  return (
    <Container className="flex flex-col justify-center h-[90vh] max-w-md animate-in fade-in-0 duration-500">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
        {/* image skeleton */}
        <div className="relative h-[480px]">
          <Skeleton className="h-full w-full rounded-none" />

          {/* gradient overlay placeholder */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* name and location placeholder */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-2">
            <Skeleton className="h-6 w-2/3 rounded-md bg-white/40" />
            <Skeleton className="h-4 w-1/2 rounded-md bg-white/30" />
          </div>
        </div>

        {/* bio section skeleton */}
        <div className="bg-[#F3F4F6] dark:bg-[#18181B] p-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />

          <div className="mt-3 border-t border-zinc-300 dark:border-zinc-700 pt-3 space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>

      {/* buttons section skeleton */}
      <div className="flex justify-center gap-6 mt-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </Container>
  );
}
