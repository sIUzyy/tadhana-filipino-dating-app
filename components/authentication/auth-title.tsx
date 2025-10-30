// next
import Link from "next/link";

// data type
interface AuthTitleProps {
  title: string;
  label: string;
}

export default function AuthTitle({ title, label }: AuthTitleProps) {
  return (
    <div className="mb-10 text-center">
      <h1 className="font-extrabold text-3xl tracking-tight">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">
        By tapping <span className="font-medium text-vibrant-red">{label}</span>
        , you agree to our{" "}
        <Link href="/terms" className="underline hover:text-vibrant-red">
          Terms of Service
        </Link>{" "}
        and understand how we process your data in our{" "}
        <Link href="/privacy" className="underline hover:text-vibrant-red">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
