interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event('navigate'));
  };

  return (
    <a 
      href={href}
      onClick={handleClick}
      className="box-border content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0 cursor-pointer transition-colors hover:bg-muted"
    >
      <p className="leading-[1.6] not-italic relative shrink-0 text-[14px] text-nowrap tracking-[-0.28px] whitespace-pre text-foreground">
        {label}
      </p>
    </a>
  );
}