// react-next
import Link from "next/link";

export default function MatchesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto bg-[#F3F4F6] dark:bg-[#18181B] px-4 py-6 rounded-lg">
      <h1 className="font-extrabold text-2xl mb-2">No matches yet 💔</h1>
      <p className="text-sm ">
        Looks like your{" "}
        <span className="font-semibold text-vibrant-red">Tadhana</span> hasn’t
        arrived just yet. Don’t lose hope — try adjusting your{" "}
        <Link
          title="Customize your preferences"
          href="/dashboard/profile/preferences"
          className="text-indigo-500 underline underline-offset-2 hover:opacity-80"
        >
          preferences
        </Link>{" "}
        to discover more potential matches.
      </p>
    </div>
  );
}
