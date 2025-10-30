// shadcn components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// image
import placeholder_img from "../../../../images/image-placeholder.jpg";

// data type - Profile
interface Profile {
  name?: string | null;
  photo?: string | null;
}

// data type - General
interface ProfileAvatarProps {
  profile: Profile;
  preview?: string | null;
}

export default function ProfileAvatar({
  profile,
  preview,
}: ProfileAvatarProps) {
  // destruct the profile data
  const { name, photo } = profile || {};

  // determine image source
  const imageSrc =
    preview ||
    (photo
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${photo.replace(/\\/g, "/")}`
      : placeholder_img.src);

  return (
    <Avatar className={`w-24 h-24 border border-gray-300 dark:border-gray-700`}>
      <AvatarImage
        src={imageSrc}
        alt={name ? `${name}'s profile photo` : "profile photo"}
      />
      <AvatarFallback>{name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
    </Avatar>
  );
}
