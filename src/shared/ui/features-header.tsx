import svgPaths from "../../imports/svg-pilyrms40n";

export function FeaturesHeader() {
  return (
    <div className="bg-white relative rounded-[20px] shadow-[0px_5px_10px_-2px_rgba(13,13,18,0.04),0px_4px_8px_-1px_rgba(13,13,18,0.02)]">
      <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[32px] py-[20px]">
        <div className="flex items-center gap-[48px]">
          <Logo />
          <Navigation />
        </div>
        <MobileMenuButton />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[28px] relative shrink-0 w-[106.815px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107 28">
        <g clipPath="url(#clip0_4_2392)">
          <path d={svgPaths.p369d4ad0} fill="var(--accent)" />
          <path d={svgPaths.p3059f100} fill="var(--accent)" />
          <path d={svgPaths.p3e10e000} fill="var(--accent)" />
          <path d={svgPaths.p7380a80} fill="var(--accent)" />
          <path d={svgPaths.p2eec5000} fill="var(--accent)" />
          <path d={svgPaths.p35fda400} fill="var(--accent)" />
          <path d={svgPaths.p19393e40} fill="var(--accent)" />
          <path d={svgPaths.p27082a00} fill="var(--accent)" />
          <path d={svgPaths.p2ea7b600} fill="var(--accent)" />
          <path d={svgPaths.p2fcfa700} fill="var(--accent)" />
          <path d={svgPaths.p4cb4a00} fill="var(--accent)" />
          <path d={svgPaths.p233e1b00} fill="var(--accent)" />
          <path d={svgPaths.pc4dbc00} fill="var(--accent)" />
          <path d={svgPaths.p62cfc00} fill="var(--accent)" />
          <path d={svgPaths.p33bfa8f2} fill="var(--accent)" />
          <path d={svgPaths.p11e5580} fill="var(--accent)" />
          <path d={svgPaths.p10eed880} fill="var(--accent)" />
          <path d={svgPaths.p27e4bb80} fill="var(--accent)" />
          <path d={svgPaths.p396c9a40} fill="var(--accent)" />
        </g>
        <defs>
          <clipPath id="clip0_4_2392">
            <rect fill="white" height="28" width="106.815" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Navigation() {
  const navItems = ['AI Tools', 'Digital Tools', 'Blog', 'About'];
  
  return (
    <div className="hidden md:flex items-center gap-[16px]">
      {navItems.map((item) => (
        <a 
          key={item}
          href="#" 
          className="box-border content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0 cursor-pointer transition-colors hover:bg-[var(--muted)]"
        >
          <p className="font-normal leading-[1.6] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre" style={{ color: 'var(--foreground)' }}>
            {item}
          </p>
        </a>
      ))}
    </div>
  );
}

function MobileMenuButton() {
  return (
    <button className="md:hidden p-2" style={{ color: 'var(--foreground)' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}
