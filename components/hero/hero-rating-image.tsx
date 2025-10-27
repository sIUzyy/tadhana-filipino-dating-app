// next
import Image from "next/image";

import imageOne from "../../images/image-rating-1.webp";
import imageTwo from "../../images/image-rating-2.webp";
import imageThree from "../../images/image-rating-3.webp";

export default function HeroRatingImage() {
  return (
    <div className="flex -space-x-3">
      {[imageThree, imageOne, imageTwo].map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`rating-images`}
          width={35}
          height={35}
          className="object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition"
        />
      ))}
    </div>
  );
}
