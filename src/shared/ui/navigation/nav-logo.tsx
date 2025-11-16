import svgPaths from "../../../imports/svg-pilyrms40n";

export function NavLogo() {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('navigate'));
  };

  return (
    <a 
      href="/"
      onClick={handleLogoClick}
      className="h-[28px] relative shrink-0 w-[106.815px] cursor-pointer"
    >
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
    </a>
  );
}
