import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link
      href={"/dashboard"}
      className="text-3xl font-extrabold tracking-tighter text-vibrant-red"
    >
      tadhana
    </Link>
  );
}
