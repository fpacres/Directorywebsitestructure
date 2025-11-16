import { FooterSocial, FooterLinkColumn } from "../shared/ui/footer";

export function LandingFooter() {
  const digitalToolsCol1 = [
    "Color Converters",
    "Unit Converters",
    "SQL Converters",
    "Encode and Decode",
    "Base64 Tools",
    "Converters",
    "JSON Converters",
    "XML Converters",
    "Random Tools",
  ];

  const digitalToolsCol2 = [
    "HTML Converters",
    "YAML Converters",
    "Utility",
    "Chart Tools",
    "Viewers",
    "Programming Editors",
    "Parsers",
    "CSS Tools",
    "Bitwise Tools",
  ];

  const digitalToolsCol3 = [
    "Escape Unescape",
    "CryptoGraphy Tools",
    "Beautifiers",
    "Minifier",
    "CSV Tools",
    "String Utilities",
    "Syntax Highlighting",
    "Number Utilities",
    "IP Tools",
  ];

  const aiTools = [
    "AI Productivity Tools",
    "AI Text Generators",
    "AI Image Tools",
    "AI Art Generators",
    "AI Video Tools",
    "AI Business Tools",
    "Automation Tools",
    "AI Audio Generators",
    "AI Code Tools",
    "Misc AI Tools",
  ];

  return (
    <footer className="w-full bg-[var(--foreground)] text-white py-12 px-8 rounded-[32px] mx-8 mt-8">
      <div className="max-w-[1400px] mx-auto">
        <FooterSocial />

        {/* Links Section */}
        <div className="grid grid-cols-5 gap-8 mb-12">
          <FooterLinkColumn title="Digital Tools" links={digitalToolsCol1} />
          <FooterLinkColumn links={digitalToolsCol2} />
          <FooterLinkColumn links={digitalToolsCol3} />
          <div className="col-span-2">
            <FooterLinkColumn title="AI Tools" links={aiTools} columns={2} />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-[var(--text-sm)] text-white/60">
            © EveryDigitalTools 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}