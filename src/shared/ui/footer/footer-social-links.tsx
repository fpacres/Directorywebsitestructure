import { FooterSocialLink } from './footer-social-link';

export function FooterSocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <FooterSocialLink href="#" label="X" />
      <FooterSocialLink href="#" label="F" />
      <FooterSocialLink href="#" label="I" />
    </div>
  );
}
