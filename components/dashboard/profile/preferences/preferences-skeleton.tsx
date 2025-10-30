// shadcn components
import { Skeleton } from "@/components/ui/skeleton";

export default function PreferencesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* preferred gender */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* preferred age range */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* save button */}
      <div className="flex lg:justify-end">
        <Skeleton className="h-10 w-full lg:w-32 rounded-md" />
      </div>
    </div>
  );
}
