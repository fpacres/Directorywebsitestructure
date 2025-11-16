interface FooterLinkColumnProps {
  title?: string;
  links: string[];
  columns?: number;
}

export default function FooterLinkColumn({
  title,
  links,
  columns = 1,
}: FooterLinkColumnProps) {
  const gridClass = columns > 1 ? `grid grid-cols-${columns} gap-x-8 gap-y-3` : "space-y-3";

  return (
    <div>
      {title && <h3 className="text-white mb-4">{title}</h3>}
      {!title && <h3 className="text-transparent mb-4 select-none">Hidden</h3>}
      <ul className={gridClass}>
        {links.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-[var(--text-sm)] text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
