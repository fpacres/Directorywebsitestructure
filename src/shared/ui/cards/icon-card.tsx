interface IconCardProps {
  icon: React.ReactNode;
  variant?: "muted" | "accent";
}

export default function IconCard({ icon, variant = "muted" }: IconCardProps) {
  const bgColor =
    variant === "accent" ? "bg-[var(--accent)]/10" : "bg-[var(--muted)]";

  return (
    <div
      className={`w-16 h-16 rounded-[var(--radius-card)] ${bgColor} flex items-center justify-center shadow-[var(--elevation-sm)]`}
    >
      {icon}
    </div>
  );
}
