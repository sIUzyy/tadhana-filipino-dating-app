// next
import Image from "next/image";

// image source
import group from "../../images/group-picture.webp";

export default function AboutImage() {
  return (
    <div>
      <Image
        className="max-w-md w-full object-cover rounded-2xl"
        src={group}
        alt="about-group-picture"
        loading="lazy"
      />
    </div>
  );
}
