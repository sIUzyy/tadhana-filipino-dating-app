// next
import Link from "next/link";

// seo
import { Metadata } from "next";

// components
import AuthTitle from "@/components/authentication/auth-title";
import SignUpForm from "@/components/authentication/auth-sign-up-form";

export const metadata: Metadata = {
  title: {
    absolute: "Sign up - Tadhana",
  },
};

export default function SignUpPage() {
  return (
    <div className="bg-dark-color flex justify-center items-center min-h-screen px-4">
      <div className="w-full text-white">
        {/* header section */}
        <div className="max-w-sm mx-auto">
          <AuthTitle title="Create an account" label="Sign up" />
        </div>

        {/* form section */}
        <SignUpForm />

        {/* details section */}
        <p className="mt-5 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link href={"/signin"} className=" text-vibrant-red">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
