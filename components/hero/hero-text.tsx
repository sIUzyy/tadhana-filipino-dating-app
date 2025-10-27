// next
import Link from "next/link";
export default function HeroText() {
  return (
    <div className="mt-5 md:mt-2.5 ">
      <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl text-center bg-linear-to-r from-[#FD297B] via-[#FF5864] to-[#FF655B] text-transparent bg-clip-text">
        Match NaaaAaaAa.
      </h1>
      <p className="mt-4 max-w-2xl text-lg font-medium text-pretty text-gray-400 sm:text-xl/8 mx-auto">
        Connect with Filipino singles who share your values, culture, and
        passion for meaningful relationships.
      </p>

      <div className="flex flex-col  lg:flex-row lg:justify-center gap-4 mt-12 ">
        <Link
          href={"/signup"}
          className="text-lg outline-none bg-linear-to-r from-[#FD297B] via-[#FF5864] to-[#FF655B] w-full lg:w-[220px]  my-auto py-3 rounded-full text-white font-bold hoverEffect hover:opacity-80"
        >
          Create account
        </Link>

        <Link
          href={"/signin"}
          className="text-lg outline-none border w-full lg:w-[220px]  my-auto py-3 rounded-full text-white font-bold hoverEffect hover:opacity-80"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
