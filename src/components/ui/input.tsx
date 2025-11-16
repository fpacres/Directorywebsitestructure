import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-[var(--radius)] border px-4 py-2 transition-colors outline-none",
        "bg-[var(--input-background)] border-[var(--border)] text-[var(--foreground)]",
        "placeholder:text-[var(--muted-foreground)]",
        "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };