import ToolCard from "./tool-card";

export default function FloatingCards() {
  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* Top Left - Canva */}
      <div className="absolute top-[5%] left-[0%] animate-float">
        <ToolCard
          name="Canva"
          category="Design Tool"
          imageUrl="https://images.unsplash.com/photo-1595409583957-5d1ec5869de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
          bgColor="rgba(255, 255, 255, 0.95)"
        />
      </div>

      {/* Top Right - Notion */}
      <div className="absolute top-[10%] right-[5%] animate-float" style={{ animationDelay: '0.5s' }}>
        <ToolCard
          name="Notion"
          category="Productivity"
          imageUrl="https://images.unsplash.com/photo-1618932376458-99e6df5ce5b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
          bgColor="rgba(255, 255, 255, 0.95)"
        />
      </div>

      {/* Middle Left - Trello */}
      <div className="absolute top-[40%] left-[5%] animate-float" style={{ animationDelay: '1s' }}>
        <ToolCard
          name="Trello"
          category="Project Management"
          imageUrl="https://images.unsplash.com/photo-1678846851706-abb02d1574aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
          bgColor="rgba(255, 255, 255, 0.95)"
        />
      </div>

      {/* Bottom Center - Figma */}
      <div className="absolute bottom-[15%] left-[20%] animate-float" style={{ animationDelay: '1.5s' }}>
        <ToolCard
          name="Figma"
          category="Design & Prototype"
          imageUrl="https://images.unsplash.com/photo-1653647054667-c99dc7f914ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
          bgColor="rgba(255, 255, 255, 0.95)"
        />
      </div>

      {/* Bottom Right - Slack */}
      <div className="absolute bottom-[20%] right-[10%] animate-float" style={{ animationDelay: '2s' }}>
        <ToolCard
          name="Slack"
          category="Communication"
          imageUrl="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
          bgColor="rgba(255, 255, 255, 0.95)"
        />
      </div>
    </div>
  );
}
