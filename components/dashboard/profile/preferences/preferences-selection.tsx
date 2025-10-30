"use client";

// react-next
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

// lib
import axios from "axios";
import toast from "react-hot-toast";

// components
import PreferencesSkeleton from "./preferences-skeleton";

// shadcn ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FieldSet, Field, FieldLabel, FieldGroup } from "@/components/ui/field";

export default function PreferencesSelection() {
  // auth context
  const { user, updateUser } = useAuth();

  // get the token from user
  const token = user?.token;

  // state for gender and age range
  const [gender, setGender] = useState("Any");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 99]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // fetch user preferences when component mounts
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/preferences`,
          {
            headers: { Authorization: `Bearer ${token}` }, // jwt token
          }
        );

        const prefs = response.data.preferences;

        if (prefs) {
          setGender(prefs.gender || "Any");
          setAgeRange([prefs.ageRange?.min || 18, prefs.ageRange?.max || 99]);
        }
      } catch (err) {
        toast.error("Unable to load your preferences. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchPreferences();
  }, [token]);

  // save the preferences of user
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/users/preferences`,
        {
          gender,
          ageRange: { min: ageRange[0], max: ageRange[1] },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const prefs = response.data.preferences;

      // update local ui state
      setGender(prefs.gender);
      setAgeRange([prefs.ageRange.min, prefs.ageRange.max]);

      // update global user state in AuthContext
      updateUser({ preferences: prefs }); // so discovery page and other pages re-render correctly

      toast.success("Your preferences have been updated successfully.");
    } catch (err: unknown) {
      toast.error("Failed to update preferences. Please try again later.");
    }
  };

  // if form is currently loading, show this.
  if (isLoading) return <PreferencesSkeleton />;

  return (
    <FieldSet>
      <FieldGroup className="space-y-4">
        {/* gender selection */}
        <Field>
          <FieldLabel>Preferred Gender</FieldLabel>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* age range selection */}
        <Field>
          <FieldLabel>Preferred Age Range</FieldLabel>
          <Slider
            value={ageRange}
            onValueChange={(val) => setAgeRange(val as [number, number])}
            min={18}
            max={99}
            step={1}
            className="mt-2"
          />
          <p className="text-sm text-gray-500 mt-1">
            Ages {ageRange[0]} to {ageRange[1]}
          </p>
        </Field>
      </FieldGroup>

      {/* button action */}
      <div className="flex lg:justify-end">
        <Button
          onClick={handleSave}
          className="w-full lg:w-fit lg:px-10 bg-green-600 text-white outline-none hover:opacity-80"
        >
          Save Preferences
        </Button>
      </div>
    </FieldSet>
  );
}
