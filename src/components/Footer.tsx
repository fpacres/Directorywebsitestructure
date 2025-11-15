import FooterColumn from '../shared/ui/footer-column';

export default function Footer() {
  const column1Links = [
    'Color Converters', 
    'Unit Converters', 
    'SQL Converters', 
    'Encode and Decode', 
    'Base64 Tools', 
    'Converters', 
    'JSON Converters', 
    'XML Converters', 
    'Random Tools'
  ];

  const column2Links = [
    'HTML Converters', 
    'YAML Converters', 
    'Utility', 
    'Chart Tools', 
    'Viewers', 
    'Programming Editors', 
    'Parsers', 
    'CSS Tools', 
    'Bitwise Tools'
  ];

  const column3Links = [
    'Escape Unescape', 
    'CryptoGraphy Tools', 
    'Beautifiers', 
    'Minifier', 
    'CSV Tools', 
    'String Utilities', 
    'Syntax Highlighting', 
    'Number Utilities', 
    'IP Tools'
  ];

  const column4Links = [
    'AI Productivity Tools', 
    'AI Text Generators', 
    'AI Image Tools', 
    'AI Art Generators', 
    'AI Video Tools', 
    'AI Business Tools', 
    'Automation Tools', 
    'AI Code Tools', 
    'Misc AI Tools'
  ];

  return (
    <div className="w-full rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden" style={{ background: 'var(--foreground)' }}>
      <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10 lg:py-12">
        {/* Logo & Social */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6" style={{ background: 'white', borderRadius: '4px' }}></div>
            <span style={{ color: 'white' }}>Ganttify</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-80 cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <span style={{ color: 'white' }}>X</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-80 cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <span style={{ color: 'white' }}>F</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-80 cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <span style={{ color: 'white' }}>I</span>
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative mb-8 sm:mb-12">
          {/* Menu1 - Content Columns Row */}
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
            <FooterColumn title="Digital Tools" links={column1Links} />
            <FooterColumn links={column2Links} />
            <FooterColumn links={column3Links} />
            <FooterColumn title="AI Productivity Tools" links={column4Links} />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 sm:pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }} className="text-xs sm:text-sm">
            © EveryDigitalTools 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}