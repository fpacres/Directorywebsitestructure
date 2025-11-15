import { FeaturesFooterLinks } from '../shared/ui/features-footer-links';

export function FeaturesFooter() {
  return (
    <div className="w-full rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden mt-4" style={{ background: 'var(--foreground)' }}>
      <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10 lg:py-12">
        <FooterTop />
        <FeaturesFooterLinks />
        <FooterCopyright />
      </div>
    </div>
  );
}

function FooterTop() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 mb-8 sm:mb-12">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6" style={{ background: 'white', borderRadius: '4px' }}></div>
        <span style={{ color: 'white' }}>Ganttify</span>
      </div>
      <SocialLinks />
    </div>
  );
}

function SocialLinks() {
  const socials = ['X', 'F', 'I'];
  
  return (
    <div className="flex items-center gap-4">
      {socials.map((social) => (
        <a 
          key={social}
          href="#" 
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-80 cursor-pointer" 
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        >
          <span style={{ color: 'white' }}>{social}</span>
        </a>
      ))}
    </div>
  );
}

function FooterCopyright() {
  return (
    <div className="text-center pt-6 sm:pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }} className="text-xs sm:text-sm">
        © EveryDigitalTools 2025. All Rights Reserved
      </p>
    </div>
  );
}
