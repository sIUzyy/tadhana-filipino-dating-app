"use client";

// data type
interface Profile {
  _id: string;
  id: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio?: string | null;
  photo: string;
}

// react-next
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";
import toast from "react-hot-toast";

// components
import ProfileAvatar from "./profile-avatar";
import ProfileSkeleton from "./profile-skeleton";
import ProfileInputFields from "./profile-input-fields";
import ProfileActionButtons from "./profile-action-buttons";

// shadcn ui
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";

export default function ProfileForm() {
  // auth-context
  const { user, logout, updateUser } = useAuth();

  // navigation
  const router = useRouter();

  // profile that stored the user data
  const [profile, setProfile] = useState<Profile | null>(null);

  // state to hold the original profile
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);

  // image state
  const [preview, setPreview] = useState<string | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  // check if editing
  const [isEditing, setIsEditing] = useState(false);

  // fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // check if user has a token
        const token = user?.token || localStorage.getItem("token");

        // if no token, re-direct to signin page
        if (!token) {
          router.replace("/signin");
          return;
        }

        // request to backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // store the data to these states
        setProfile(response.data.user);
        setOriginalProfile(response.data.user);
      } catch (err) {
        toast.error("Failed to fetch profile. Please try again later.");

        // if there's an error, logout the user
        logout();

        // re-direct to signin page
        router.replace("/signin");
      }
    };

    fetchProfile();
  }, [user, logout, router]);

  // handle photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // handle save the changes (name, bio, photo)
  const handleSave = async () => {
    // prevents null access
    if (!profile) return;

    try {
      // check if there's a token
      const token = user?.token || localStorage.getItem("token");
      if (!token) return;

      // create a formdata
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("bio", profile.bio || "");
      if (newPhoto) formData.append("photo", newPhoto);

      // send the formdata to backend
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

      // update auth-context and localstorage
      updateUser({ name: updatedUser.name });

      // update these states
      setProfile(updatedUser);
      setNewPhoto(null);
      setPreview(null);
      setIsEditing(false);

      // show a success message
      toast.success("Your profile was updated successfully.");

      // refresh the page
      router.refresh();
    } catch (err) {
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  // handle cancel (restore previous state)
  const handleCancel = () => {
    setProfile(originalProfile);
    setPreview(null);
    setNewPhoto(null);
    setIsEditing(false);
  };

  // show this while the profile is not fully render (--note: do not move this code at the top)
  if (!profile) return <ProfileSkeleton />;

  return (
    <FieldSet>
      <div className="flex flex-col items-center gap-3 mb-5">
        <ProfileAvatar profile={profile} preview={preview} />

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

      {/* input fields */}
      <ProfileInputFields
        profile={profile}
        isEditing={isEditing}
        onChange={(key, value) => setProfile({ ...profile, [key]: value })}
      />

      {/* action buttons */}
      <ProfileActionButtons
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </FieldSet>
  );
}
