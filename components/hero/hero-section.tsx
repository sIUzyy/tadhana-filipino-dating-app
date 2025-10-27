// component
import HeroRating from "./hero-rating";
import HeroText from "./hero-text";

export default function Hero() {
  return (
    <div
      className="min-h-screen relative text-black"
      style={{
        backgroundImage: "url('/background/background-image.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 z-0 bg-linear-to-r from-black/90 via-black/75 to-black/20 pointer-events-none" />

      <div
        id="hero"
        className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-white text-center"
      >
        <HeroRating />
        <HeroText />
      </div>

      {/* this h1 is fixed to the very bottom */}
      <h1 className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-gray-300 z-10 text-center w-full px-4">
        All photos are of models and used for illustrative purposes only
      </h1>
    </div>
  );
}
