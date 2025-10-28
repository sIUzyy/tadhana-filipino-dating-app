import { cn } from "@/lib/utils";

// shadcn ui
import { Spinner } from "@/components/ui/spinner";

export default function Loading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {text} <Spinner />
    </div>
  );
}
