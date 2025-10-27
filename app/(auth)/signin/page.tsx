// next
import Link from "next/link";
import { Metadata } from "next";

// components
import AuthTitle from "@/components/authentication/auth-title";
import SignInForm from "@/components/authentication/auth-sign-in-form";

// seo
export const metadata: Metadata = {
  title: {
    absolute: "Sign in - Tadhana",
  },
};

export default function SignInPage() {
  return (
    <div className="bg-dark-color flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-sm text-white">
        {/* header section */}
        <AuthTitle title="Get Started" label="Sign in" />

        {/* form section */}
        <SignInForm />

        {/* details section */}
        <p className="mt-5 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link href={"/signup"} className=" text-vibrant-red">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
