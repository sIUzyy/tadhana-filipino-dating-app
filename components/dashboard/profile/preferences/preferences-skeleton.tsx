import { Skeleton } from "@/components/ui/skeleton";

export default function PreferencesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Preferred Gender */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Select */}
        </div>

        {/* Preferred Age Range */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" /> {/* Label */}
          <Skeleton className="h-2 w-full rounded-full" /> {/* Slider */}
          <Skeleton className="h-4 w-28" /> {/* Text under slider */}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex lg:justify-end">
        <Skeleton className="h-10 w-full lg:w-32 rounded-md" />
      </div>
    </div>
  );
}
