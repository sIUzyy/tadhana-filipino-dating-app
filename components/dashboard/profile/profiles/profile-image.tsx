// next
import Image from "next/image";

// shadcn ui
import { Button } from "@/components/ui/button";

// image-src
import placeholder_img from "../../../../images/image-placeholder.jpg";

export default function ProfileImage() {
  return (
    <div className="flex flex-col items-center gap-3 mb-5">
      <div className="relative h-28 w-28">
        <Image
          src={placeholder_img}
          alt="Profile photo"
          loading="eager"
          className="rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
      </div>
      <Button variant="outline" size="sm">
        Change Photo
      </Button>
    </div>
  );
}
