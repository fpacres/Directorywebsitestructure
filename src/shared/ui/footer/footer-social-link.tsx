interface FooterSocialLinkProps {
  href: string;
  label: string;
}

export function FooterSocialLink({ href, label }: FooterSocialLinkProps) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-80 cursor-pointer" 
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      <span style={{ color: 'white' }}>{label}</span>
    </a>
  );
}
