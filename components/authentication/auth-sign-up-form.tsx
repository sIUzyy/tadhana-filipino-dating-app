"use client";

// react-next
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";

// components
import Loading from "../loading";

// shadcn ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpForm() {
  // navigation
  const router = useRouter();

  // auth-context
  const { login } = useAuth();

  // value state
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [ageError, setAgeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // image preview
  const [preview, setPreview] = useState<string | null>(null);

  // submit the data in the backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.trim()) {
      setEmailError("Email field cannot be empty");
      setIsLoading(false);
      return;
    }

    if (!name.trim()) {
      setNameError("Name field cannot be empty");
      setIsLoading(false);
      return;
    }

    if (!age.trim()) {
      setAgeError("Age field cannot be empty");
      setIsLoading(false);
      return;
    }

    if (Number(age) < 18) {
      setAgeError("Age must be at least 18 years old");
      setIsLoading(false);
      return;
    }

    if (!gender.trim()) {
      setGenderError("Please select a gender");
      setIsLoading(false);
      return;
    }

    if (!location.trim()) {
      setLocationError("Location field cannot be empty");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password field cannot be empty");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    if (!file) {
      setImageError("Please upload a profile photo");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("location", location);
      formData.append("password", password);
      formData.append("photo", file);

      // request to backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/signup`,
        formData
      );

      // extract user data from backend response
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        photo: response.data.user.photo,
        token: response.data.user.token,
      };

      // auth-context
      login(userData);

      // toast message
      toast.success("Successfully signed up for Tadhana!");

      // clear fields
      setEmail("");
      setName("");
      setAge("");
      setGender("");
      setLocation("");
      setPassword("");
      setFile(null);

      // direct to dashboard/profile after signing up
      router.push("/dashboard/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        // map backend error messages to fields
        if (status === 422) {
          // validation error
          toast.error(message || "Invalid input, please check your data.");
        } else if (status === 400) {
          // user already exists
          setEmailError(
            message || "User already exists. Please log in instead."
          );
        } else if (status === 500) {
          toast.error(message || "Server error. Please try again later.");
        } else {
          toast.error(message || "Signing up failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
      <FieldSet>
        {/* upload photo */}
        <Field>
          <div className="flex flex-col items-center justify-center">
            {!preview ? (
              <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:bg-primary-dark transition relative overflow-hidden"
              >
                <UploadCloud className="h-6 w-6 text-gray-400 mb-1" />
                <p className="text-xs text-gray-500">Upload photo</p>
                <Input
                  id="photo"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (!selectedFile) return;

                    setFile(selectedFile); // store the file in state
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setPreview(reader.result as string);
                    reader.readAsDataURL(selectedFile);

                    if (imageError) setImageError("");
                  }}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={preview}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {preview && (
              <Button
                className="my-3 border border-gray-600 hover:text-vibrant-red hoverEffect"
                size="sm"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
              >
                Change Photo
              </Button>
            )}

            <p className="text-sm text-gray-500 mt-1">
              Upload a photo (max 2 MB, PNG, JPEG, JPG)
            </p>
          </div>

          <FieldDescription className="text-vibrant-red text-xs text-center">
            {imageError}
          </FieldDescription>
        </Field>
        <FieldGroup>
          <div className="flex flex-col lg:flex-row gap-2">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder={"e.g., johndoe@example.com"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
              />
              <FieldDescription className="text-vibrant-red text-xs">
                {emailError}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder={"e.g., John Doe"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
              />
              <FieldDescription className="text-vibrant-red text-xs">
                {nameError}
              </FieldDescription>
            </Field>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <Field>
              <FieldLabel htmlFor="age">Age</FieldLabel>
              <Input
                id="age"
                type="number"
                min={18}
                placeholder={"e.g., 18"}
                value={age}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (ageError) setAgeError("");
                }}
              />

              <FieldDescription className="text-vibrant-red text-xs">
                {ageError}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Select
                value={gender}
                onValueChange={(value) => {
                  setGender(value);
                  if (genderError) setGenderError("");
                }}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder={"Select gender"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Any">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>

              <FieldDescription className="text-vibrant-red text-xs">
                {genderError}
              </FieldDescription>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              type="text"
              placeholder={"e.g., Mandaluyong City"}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (locationError) setLocationError("");
              }}
            />

            <FieldDescription className="text-vibrant-red text-xs">
              {locationError}
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder={"Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
            />
            <FieldDescription className="text-vibrant-red text-xs">
              {passwordError}
            </FieldDescription>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black hover:opacity-90"
        >
          {isLoading ? <Loading text="Signing Up" /> : "Sign Up"}
        </Button>
      </FieldSet>
    </form>
  );
}
