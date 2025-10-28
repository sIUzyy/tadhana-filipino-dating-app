import { cn } from "@/lib/utils";

export default function DashboardTitle({
  text,
  label,
  details,
  className,
}: {
  text: string;
  label?: string;
  details: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-5", className)}>
      <h1 className="font-bold text-2xl tracking-tighter">
        {text} {label && <span className="text-vibrant-red">{label}.</span>}
      </h1>
      <p className="text-gray-500 text-sm">{details}</p>
    </div>
  );
}
