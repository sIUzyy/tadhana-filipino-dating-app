// react-next
import Link from "next/link";

export default function MessageEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto bg-[#F3F4F6] dark:bg-[#18181B] px-4 py-6 rounded-lg">
      <h1 className="font-extrabold text-2xl mb-2">No messages yet 💌</h1>
      <p className="text-sm ">
        Messages will appear once you find your{" "}
        <span className="font-semibold text-vibrant-red">Tadhana</span>. Haven’t
        matched with anyone yet? Try exploring{" "}
        <Link
          title="Find your tadhana"
          href="/dashboard"
          className="text-indigo-500 underline underline-offset-2 hover:opacity-80"
        >
          potential matches
        </Link>{" "}
        and start your story.
      </p>
    </div>
  );
}
