import HeroRatingData from "./hero-rating-data";
import HeroRatingImage from "./hero-rating-image";

export default function HeroRating() {
  return (
    <div className="flex items-center gap-3 mb-0">
      <HeroRatingImage />
      <HeroRatingData />
    </div>
  );
}
