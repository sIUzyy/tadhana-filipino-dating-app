"use client";
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
import { useState } from "react";

import axios from "axios";

export default function SignInForm() {
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data.user;
      console.log("Logged in user:", user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : error;
      console.log(message);
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

        <Button type="submit" className="bg-white text-black hover:opacity-90">
          Sign In
        </Button>
      </FieldSet>
    </form>
  );
}
