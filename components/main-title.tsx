import { cn } from "@/lib/utils";

export default function Title({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl",
        className
      )}
    >
      {text}
    </h1>
  );
}
