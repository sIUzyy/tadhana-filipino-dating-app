// react
import React from "react";

// components
import ProfileImage from "@/components/dashboard/profile/profiles/profile-image";
import ProfileForm from "@/components/dashboard/profile/profiles/profile-form";

export default function ProfilePage() {
  return (
    <React.Fragment>
      {/* profile image section */}
      <ProfileImage />

      {/* form section */}
      <ProfileForm />
    </React.Fragment>
  );
}
