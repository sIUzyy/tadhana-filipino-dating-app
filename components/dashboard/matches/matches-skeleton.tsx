// shadcn components
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

export default function MatchesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex items-start gap-4">
            {/* Avatar */}
            <Skeleton className="h-20 w-20 rounded-full" />

            <div className="flex-1 flex flex-col gap-2">
              {/* Name */}
              <Skeleton className="h-6 w-1/2 rounded" />
              {/* Bio */}
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-10 w-24 rounded" />
                <Skeleton className="h-10 w-24 rounded" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
