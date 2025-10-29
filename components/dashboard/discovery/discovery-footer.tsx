import Link from "next/link";

export default function DiscoveryFooter() {
  return (
    <div className="mt-10 text-center ">
      <p className="text-sm text-gray-500">
        Note: By default, it returns all genders (any) and ages between 18 and
        99. To customize your preferences, go{" "}
        <Link
          href="/dashboard/profile/preferences"
          className="text-indigo-600 hover:underline"
        >
          here
        </Link>
        .
      </p>
    </div>
  );
}
