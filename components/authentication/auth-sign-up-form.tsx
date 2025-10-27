"use client";

// shadcn ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";

export default function SignUpForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => setPreview(null);

  return (
    <form className="max-w-xl mx-auto">
      <FieldSet>
        {/* Upload Photo */}
        <Field>
          <div className="flex flex-col items-center justify-center mt-2">
            {!preview ? (
              <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition relative overflow-hidden"
              >
                <UploadCloud className="h-6 w-6 text-gray-400 mb-1" />
                <p className="text-xs text-gray-500">Upload photo</p>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-32 h-32 rounded-full overflow-hidden group">
                <Image
                  src={preview}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-black/60 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-2">
            Upload profile picture
          </p>
        </Field>
        <FieldGroup>
          <div className="flex gap-2">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="Email address" />
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" type="text" placeholder="Name" />
            </Field>
          </div>

          <div className="flex gap-2">
            <Field>
              <FieldLabel htmlFor="age">Age</FieldLabel>
              <Input id="age" type="number" placeholder="Age" />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input id="location" type="text" placeholder="Select Location" />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="Password" />
          </Field>
        </FieldGroup>

        <Button className="bg-white text-black hover:opacity-90">
          Sign Up
        </Button>
      </FieldSet>
    </form>
  );
}
