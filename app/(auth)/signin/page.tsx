// shadcn
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// next
import Link from "next/link";
import { Metadata } from "next";

// components
import AuthTitle from "@/components/authentication/auth-title";

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
        <AuthTitle title="Get Started" label="Sign in" />

        <form>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="Email address" />
                <FieldDescription>
                  Choose a unique username for your account.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input id="password" type="password" placeholder="Password" />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
            </FieldGroup>

            <Button className="bg-white text-black hover:opacity-90">
              Sign In
            </Button>
          </FieldSet>
        </form>

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
