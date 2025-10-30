// shadcn components
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* profile photo section */}
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="relative h-28 w-28">
          <Skeleton className="h-28 w-28 rounded-full" />
        </div>
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>

      {/* field group */}
      <div className="flex flex-col gap-5">
        {/* email and gender */}
        <div className="flex flex-col lg:flex-row gap-3">
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
        </div>

        {/* location */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* name and age */}
        <div className="flex flex-col lg:flex-row gap-3">
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
        </div>

        {/* bio */}
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* save Button */}
      <div className="flex justify-end mt-5">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}
