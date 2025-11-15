export function FeaturesFooterLinks() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative mb-8 sm:mb-12">
      <FooterHeaders />
      <FooterColumns />
    </div>
  );
}

function FooterHeaders() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <FooterHeader title="Color Converters" />
      <FooterHeader title="" />
      <FooterHeader title="" />
      <FooterHeader title="AI Productivity Tools" />
    </div>
  );
}

function FooterHeader({ title }: { title: string }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0">
      <div className={`flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white tracking-[-0.36px] w-full ${!title ? 'opacity-0' : ''}`}>
        <p className="leading-[1.5]">{title || ' '}</p>
      </div>
    </div>
  );
}

function FooterColumns() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <DigitalToolsColumn />
      <Column2 />
      <Column3 />
      <AIToolsColumn />
    </div>
  );
}

function DigitalToolsColumn() {
  const links = [
    'Color Converters', 'Unit Converters', 'SQL Converters', 'Encode and Decode',
    'Base64 Tools', 'Converters', 'JSON Converters', 'XML Converters', 'Random Tools'
  ];
  
  return <FooterLinkColumn links={links} />;
}

function Column2() {
  const links = [
    'HTML Converters', 'YAML Converters', 'Utility', 'Chart Tools',
    'Viewers', 'Programming Editors', 'Parsers', 'CSS Tools', 'Bitwise Tools'
  ];
  
  return <FooterLinkColumn links={links} />;
}

function Column3() {
  const links = [
    'Escape Unescape', 'CryptoGraphy Tools', 'Beautifiers', 'Minifier',
    'CSV Tools', 'String Utilities', 'Syntax Highlighting', 'Number Utilities', 'IP Tools'
  ];
  
  return <FooterLinkColumn links={links} />;
}

function AIToolsColumn() {
  const links = [
    'AI Productivity Tools', 'AI Text Generators', 'AI Image Tools', 'AI Art Generators',
    'AI Video Tools', 'AI Business Tools', 'Automation Tools', 'AI Audio Generators',
    'AI Code Tools', 'Misc AI Tools'
  ];
  
  return <FooterLinkColumn links={links} />;
}

function FooterLinkColumn({ links }: { links: string[] }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[16px] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#818898] text-[16px] tracking-[-0.32px]">
      {links.map((link) => (
        <a 
          key={link}
          href="#" 
          className="flex flex-col justify-center relative shrink-0 w-full hover:underline hover:text-white transition-colors cursor-pointer"
        >
          <p className="leading-[1.5]">{link}</p>
        </a>
      ))}
    </div>
  );
}
