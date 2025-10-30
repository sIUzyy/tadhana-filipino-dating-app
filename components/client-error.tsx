import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

export default function ClientError({
  error,
  code,
}: {
  error: string | null;
  code?: string | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4  max-w-md mx-auto">
      <h1 className="font-extrabold text-2xl mb-2 text-vibrant-red">
        Error {code || 500}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {error || "Something went wrong with the server."} Please try again
        later.
      </p>

      <div className="grid w-full gap-3 mt-5 border-t pt-5">
        <Label htmlFor="message">Help us make things better.</Label>
        <Textarea
          className="text-sm"
          placeholder="Type your feedback here."
          id="message"
        />
        <Button variant={"secondary"}>Submit</Button>
      </div>
    </div>
  );
}
