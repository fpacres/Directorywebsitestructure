import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-[var(--radius)] border px-4 py-2 transition-colors outline-none resize-none",
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

export { Textarea };