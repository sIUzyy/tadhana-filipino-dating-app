// react
import React from "react";

// built-in lib
import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 xl:px-0 ", className)}>
      {children}
    </div>
  );
}
