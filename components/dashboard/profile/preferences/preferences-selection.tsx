// shadcn ui
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
  return (
    <FieldSet>
      <FieldGroup className="space-y-4">
        {/* gender section */}
        <Field>
          <FieldLabel>Preferred Gender</FieldLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {/* age range section */}
        <Field>
          <FieldLabel>Preferred Age Range</FieldLabel>
          <Slider
            defaultValue={[20, 35]}
            min={18}
            max={60}
            step={1}
            className="mt-2"
          />
          <p className="text-sm text-gray-500 mt-1">Ages 20 to 35</p>
        </Field>

        {/* distance */}
        <Field>
          <FieldLabel>Maximum Distance (km)</FieldLabel>
          <Slider
            defaultValue={[20]}
            min={1}
            max={100}
            step={1}
            className="mt-2"
          />
          <p className="text-sm text-gray-500 mt-1">Within 20 km</p>
        </Field>
      </FieldGroup>

      <div className="flex lg:justify-end">
        <Button className="w-full lg:w-fit lg:px-10 bg-green-600  text-white outline-none hover:opacity-80 hoverEffect">
          Save Preferences
        </Button>
      </div>
    </FieldSet>
  );
}
