import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile Photo Section */}
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="relative h-28 w-28">
          <Skeleton className="h-28 w-28 rounded-full" />
        </div>
        <Skeleton className="h-8 w-28 rounded-md" /> {/* Change Photo button */}
      </div>

      {/* Field Group */}
      <div className="flex flex-col gap-5">
        {/* Email + Gender */}
        <div className="flex flex-col lg:flex-row gap-3">
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
        </div>

        {/* Location */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* Name + Age */}
        <div className="flex flex-col lg:flex-row gap-3">
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
          <Skeleton className="h-10 w-full lg:w-1/2 rounded-md" />
        </div>

        {/* Bio */}
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-5">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}
