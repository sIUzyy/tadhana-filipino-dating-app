"use client";

// react-next
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";
import toast from "react-hot-toast";

// components
import Loading from "../loading";

// shadcn ui components
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
  // navigation
  const router = useRouter();

  // auth-context
  const { login } = useAuth();

  // value state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // loading satte
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // submit the data in the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.trim()) {
      setEmailError("Email field cannot be empty");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password field cannot be empty");
      setIsLoading(false);
      return;
    }

    try {
      // request to backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // extract user data from backend response
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        photo: response.data.user.photo,
        token: response.data.user.token,
      };

      // send the user data to auth-context
      login(userData);

      // toast message
      toast.success("Successfully logged in for Tadhana!");

      // clear fields
      setEmail("");
      setPassword("");

      // direct to dashboard after signing in
      router.push("/dashboard");
    } catch (error: unknown) {
      setIsLoading(false);

      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) {
          toast.error(message || "Invalid credentials. Please try again.");
        } else if (status === 400) {
          toast.error(message || "Please provide both email and password.");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message || "Signing in failed. Please try again later.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
            />
            <FieldDescription className="text-vibrant-red">
              {emailError}
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
            />
            <FieldDescription className="text-vibrant-red">
              {passwordError}
            </FieldDescription>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black hover:opacity-90"
        >
          {isLoading ? <Loading text="Signing In" /> : "Sign In"}
        </Button>
      </FieldSet>
    </form>
  );
}
