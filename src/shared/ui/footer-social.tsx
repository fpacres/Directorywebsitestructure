import { Sparkle, XLogo, FacebookLogo, InstagramLogo } from 'phosphor-react';

export function FooterSocial() {
  return (
    <div className="flex items-start justify-between mb-12 pb-8 border-b border-white/10">
      <div className="flex items-center gap-2">
        <Sparkle size={24} weight="fill" color="white" />
        <span className="text-white">Ganttify</span>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-4">
        {/* X (Twitter) */}
        <a
          href="#twitter"
          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <XLogo size={18} weight="regular" color="white" />
        </a>

        {/* Facebook */}
        <a
          href="#facebook"
          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <FacebookLogo size={22} weight="regular" color="white" />
        </a>

        {/* Instagram */}
        <a
          href="#instagram"
          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <InstagramLogo size={22} weight="regular" color="white" />
        </a>
      </div>
    </div>
  );
}