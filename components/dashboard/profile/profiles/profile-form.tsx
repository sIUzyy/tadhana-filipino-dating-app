// shadn ui
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileForm() {
  return (
    <FieldSet>
      <FieldGroup>
        <div className="flex flex-col lg:flex-row gap-2 mt-7">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="siuzysaur@gmail.com" disabled />
          </Field>

          <Field>
            <FieldLabel>Gender</FieldLabel>
            <Input placeholder="Male" disabled />
          </Field>
        </div>

        <Field>
          <FieldLabel>Location</FieldLabel>
          <Input placeholder="Mandaluyong, Metro Manila, PH" disabled />
        </Field>

        <div className="flex flex-col lg:flex-row gap-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" type="text" placeholder="siuzy saur" />
          </Field>

          <Field>
            <FieldLabel>Age</FieldLabel>
            <Input placeholder="22" disabled />
          </Field>
        </div>

        <Field>
          <FieldLabel>Bio</FieldLabel>

          <Textarea placeholder="Type your bio here." />
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-end">
        <Button className="lg:w-fit lg:px-10 bg-green-600  text-white outline-none hover:opacity-90 hoverEffect">
          Save Changes
        </Button>

        <Button className="lg:w-fit lg:px-16 bg-primary-dark text-primary-white dark:bg-primary-white dark:text-primary-dark hover:opacity-90 hoverEffect">
          Sign out
        </Button>
      </div>
    </FieldSet>
  );
}
