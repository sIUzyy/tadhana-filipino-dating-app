"use client";

// react-next
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// components
import ClientError from "@/components/client-error";
import Container from "@/components/containers/container";
import MatchesIdSkeleton from "@/components/dashboard/matches/id/matches-id-skeleton";
import MatchesIdButtons from "@/components/dashboard/matches/id/matches-id-button-action";

// image
import placeholder_img from "../../../../images/image-placeholder.jpg";

// lib
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

// data type
type UserProfile = {
  _id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  photo?: string;
};

export default function MatchViewProfile() {
  // id params, dynamic view
  const { id } = useParams();

  // auth-context
  const { user: authUser } = useAuth();

  // store the user data
  const [user, setUser] = useState<UserProfile | null>(null);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // fetch the user data
  useEffect(() => {
    // if no id, stop.
    if (!id) return;

    const fetchUser = async () => {
      try {
        // get the jwt token from context
        const token = authUser?.token;

        // request to backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/${id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        // store the data to setUser state
        setUser(response.data.user);
      } catch (error: unknown) {
        toast.error(
          "Failed to fetch the user profile. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, authUser?.token]);

  // if loading, show this component
  if (isLoading) return <MatchesIdSkeleton />;

  if (!user)
    return <ClientError error={"User Profile not found."} code={"404"} />;

  // destruc the photo path
  const photoUrl =
    user.photo && user.photo.trim() !== ""
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.photo.replace(
          /\\/g,
          "/"
        )}`
      : placeholder_img.src;

  return (
    <Container className="flex flex-col justify-center h-[90vh] max-w-md">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
        {/* image */}
        <div className="relative h-[480px]">
          <Image
            src={photoUrl}
            alt={`${user.name}'s photo`}
            fill
            className="object-cover"
            unoptimized
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* name, age, location section  */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h1 className="text-2xl font-bold tracking-tight">
              {user.name}, {user.age}
            </h1>
            <p className="text-sm flex items-center gap-1 ">
              <MapPin size={15} />
              {user.location}
            </p>
          </div>
        </div>

        {/* bio section */}
        <div className="bg-[#F3F4F6] dark:bg-[#18181B] p-4">
          <p className="text-sm  leading-relaxed">{user.bio}</p>
          <div className="mt-3 border-t  pt-3">
            <p className="text-xs text-gray-500">Gender</p>
            <p className="font-medium text-sm ">{user.gender}</p>
          </div>
        </div>
      </div>

      {/* buttons action section */}
      <MatchesIdButtons />
    </Container>
  );
}
