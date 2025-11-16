import { FooterColumn, FooterLogo, FooterSocialLinks, FooterCopyright } from '../shared/ui/footer';
import { footerLinks } from '../shared/data/footer-links';

export default function Footer() {
  return (
    <div className="w-full rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden" style={{ background: 'var(--foreground)' }}>
      <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10 lg:py-12">
        {/* Logo & Social */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 mb-8 sm:mb-12">
          <FooterLogo />
          <FooterSocialLinks />
        </div>

        {/* Footer Links */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative mb-8 sm:mb-12">
          {/* Menu1 - Content Columns Row */}
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
            <FooterColumn title={footerLinks.column1.title} links={footerLinks.column1.links} />
            <FooterColumn links={footerLinks.column2.links} />
            <FooterColumn links={footerLinks.column3.links} />
            <FooterColumn title={footerLinks.column4.title} links={footerLinks.column4.links} />
          </div>
        </div>

        {/* Copyright */}
        <FooterCopyright />
      </div>
    </div>
  );
}