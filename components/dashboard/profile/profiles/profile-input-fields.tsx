// shadcn components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

// data type
export interface Profile {
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

// data type
interface ProfileFieldsProps {
  profile: Profile;
  isEditing: boolean;
  onChange: <K extends keyof Pick<Profile, "name" | "bio">>(
    key: K,
    value: Profile[K]
  ) => void;
}

export default function ProfileInputFields({
  profile,
  isEditing,
  onChange,
}: ProfileFieldsProps) {
  const { email, gender, location, name, age, bio } = profile;

  return (
    <FieldGroup>
      {/* email and gender */}
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

      {/* location */}
      <Field>
        <FieldLabel>Location</FieldLabel>
        <Input value={location} disabled readOnly />
      </Field>

      {/* name and age */}
      <div className="flex flex-col lg:flex-row gap-2">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        </Field>

        <Field>
          <FieldLabel>Age</FieldLabel>
          <Input value={age} disabled readOnly />
        </Field>
      </div>

      {/* bio */}
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea
          placeholder="Type your bio here."
          value={bio || ""}
          onChange={(e) => onChange("bio", e.target.value)}
          disabled={!isEditing}
          readOnly={!isEditing}
        />
      </Field>
    </FieldGroup>
  );
}
