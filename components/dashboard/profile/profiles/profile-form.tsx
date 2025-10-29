"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import toast from "react-hot-toast";
import ProfileSkeleton from "./profile-skeleton";
import placeholder_img from "../../../../images/image-placeholder.jpg";

// shadcn ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

import { motion, AnimatePresence } from "framer-motion";

export default function ProfileForm() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [originalProfile, setOriginalProfile] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = user?.token || localStorage.getItem("token");
        if (!token) {
          router.replace("/signin");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(response.data.user);
        setOriginalProfile(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to fetch profile. Please try again.");
        logout();
        router.replace("/signin");
      }
    };

    fetchProfile();
  }, [user, logout, router]);

  // Handle photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle save
  const handleSave = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("bio", profile.bio || "");
      if (newPhoto) formData.append("photo", newPhoto);

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

      const updatedUser = response.data.user;

      // ✅ Update AuthContext + localStorage
      updateUser({ name: updatedUser.name });

      setProfile(updatedUser);
      setNewPhoto(null);
      setPreview(null);
      setIsEditing(false);
      toast.success("Your profile was updated successfully.");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Handle cancel (restore previous state)
  const handleCancel = () => {
    setProfile(originalProfile);
    setPreview(null);
    setNewPhoto(null);
    setIsEditing(false);
  };

  if (!profile) return <ProfileSkeleton />;

  const { email, gender, name, location, age, photo, bio } = profile;

  const imageSrc =
    preview ||
    (photo
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${photo.replace(/\\/g, "/")}`
      : ""); // empty if no image

  return (
    <FieldSet>
      <div className="flex flex-col items-center gap-3 mb-5">
        <Avatar className="w-24 h-24 border border-gray-300 dark:border-gray-700">
          <AvatarImage
            src={imageSrc || placeholder_img.src}
            alt="profile photo"
          />
          <AvatarFallback>{name?.[0] || "?"}</AvatarFallback>
        </Avatar>

        {isEditing && (
          <>
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
          </>
        )}
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
              disabled={!isEditing}
              readOnly={!isEditing}
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
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        </Field>
      </FieldGroup>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-end mt-5">
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div
              key="edit-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full lg:w-fit lg:px-10 bg-blue-600 text-white hover:opacity-90"
              >
                Edit Profile
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="edit-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 lg:flex-row lg:justify-end"
            >
              <Button
                onClick={handleSave}
                className="lg:w-fit lg:px-10 bg-green-600 text-white hover:opacity-90"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="lg:w-fit lg:px-10 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FieldSet>
  );
}
