import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

interface ToolCardProps {
  name: string;
  category: string;
  imageUrl: string;
  bgColor?: string;
}

export default function ToolCard({ name, category, imageUrl, bgColor = "var(--card)" }: ToolCardProps) {
  return (
    <div 
      className="rounded-[var(--radius-card)] p-4 shadow-lg backdrop-blur-sm border border-white/20"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[var(--radius)] overflow-hidden bg-white flex items-center justify-center">
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div>
          <h3 className="text-[var(--foreground)] m-0">{name}</h3>
          <p className="text-[var(--muted-foreground)] text-[var(--text-xs)] m-0">{category}</p>
        </div>
      </div>
    </div>
  );
}
