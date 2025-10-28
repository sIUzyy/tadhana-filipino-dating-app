"use client";

// react-next
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";
import toast from "react-hot-toast";

// component
import Loading from "@/components/loading";

// image-source
import placeholder_img from "../../../../images/image-placeholder.jpg";

// shadn ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

export default function ProfileForm() {
  // auth-context
  const { user, logout } = useAuth();

  // navigation
  const router = useRouter();

  // user data state
  const [profile, setProfile] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  // fetch user profile function
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // if your context has token:
        const token = user?.token || localStorage.getItem("token");

        // if no token, re-direct to /signin page
        if (!token) {
          router.replace("/signin");
          return;
        }

        // request to backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProfile(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);

        // show an error using toast
        toast.error("Failed to fetch profile. Please try again.");

        // (option): force logout if token invalid
        logout();
        router.replace("/signin");
      }
    };

    // invoke the function
    fetchProfile();
  }, [user, logout, router]);

  // logout function from context and redirect to signin page
  const handleLogout = () => {
    logout();
    router.replace("/signin");
  };

  // handle the photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // handle save changes (photo, name, bio)
  const handleSave = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("bio", profile.bio || "");
      if (newPhoto) formData.append("photo", newPhoto);

      // request to backend
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/me`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(response.data.user);
      setNewPhoto(null);
      setPreview(null);
      toast.success("Your profile was updated successfully.");
      router.refresh();
    } catch (err) {
      // console.error("Error saving profile:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // show a loading if all the data is not fully loaded yet
  if (!profile)
    return (
      <Loading className="flex justify-center" text="Profile is loading" />
    );

  // destructure after the null check
  const { email, gender, name, location, age, photo, bio } = profile;

  // determine the display image safely
  const imageSrc =
    preview ||
    (photo
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${photo.replace(/\\/g, "/")}`
      : placeholder_img);

  return (
    <FieldSet>
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="relative h-28 w-28">
          <Image
            src={imageSrc}
            width={112}
            height={112}
            alt="profile photo"
            unoptimized
            className="rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />
        </div>

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="photo"
          className="hidden"
          onChange={handlePhotoChange}
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("photo")?.click()}
        >
          Change Photo
        </Button>
      </div>
      <FieldGroup>
        <div className="flex flex-col lg:flex-row gap-2 mt-7">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input value={email} disabled readOnly />
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Input value={gender} disabled readOnly />
          </Field>
        </div>

        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input value={location} disabled readOnly />
        </Field>

        <div className="flex flex-col lg:flex-row gap-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </Field>

          <Field>
            <FieldLabel>Age</FieldLabel>
            <Input value={age} disabled readOnly />
          </Field>
        </div>

        <Field>
          <FieldLabel>Bio</FieldLabel>

          <Textarea
            placeholder="Type your bio here."
            value={bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-end">
        <Button
          onClick={handleSave}
          className="lg:w-fit lg:px-10 bg-green-600  text-white outline-none hover:opacity-90 hoverEffect"
        >
          Save Changes
        </Button>

        <Button
          onClick={handleLogout}
          className="lg:w-fit lg:px-16 bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark hover:opacity-90 hoverEffect"
        >
          Sign out
        </Button>
      </div>
    </FieldSet>
  );
}
