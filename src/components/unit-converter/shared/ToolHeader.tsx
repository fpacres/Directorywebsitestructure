import { FileText, CaretRight, House } from '@phosphor-icons/react';
import imgToolNameHeader from "figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png";
import { navigate } from '../../../shared/utils/navigation';

interface ToolHeaderProps {
  categoryName: string;
  title: string;
  description?: string;
  excerpt?: string;
}

function Breadcrumbs({ categoryName }: { categoryName: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      {/* Home link */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-[8px] transition-opacity hover:opacity-70"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <House 
          size={16} 
          weight="regular" 
          style={{ color: 'var(--grayscale-0)' }}
        />
        <span
          style={{
            color: 'var(--grayscale-0)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: '1.6',
            letterSpacing: '-0.28px',
          }}
        >
          Home
        </span>
      </button>

      {/* Separator */}
      <CaretRight 
        size={16} 
        weight="regular" 
        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
      />

      {/* Digital Tools link */}
      <button
        onClick={() => navigate('/digital-tools')}
        className="flex items-center gap-[8px] transition-opacity hover:opacity-70"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <FileText 
          size={16} 
          weight="regular" 
          style={{ color: 'var(--grayscale-0)' }}
        />
        <span
          style={{
            color: 'var(--grayscale-0)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: '1.6',
            letterSpacing: '-0.28px',
          }}
        >
          Digital Tools
        </span>
      </button>
    </div>
  );
}

function HeaderContent({ categoryName, title, description, excerpt }: ToolHeaderProps) {
  const displayDescription = excerpt || description || '';
  
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-center min-h-px min-w-px relative shrink-0">
      <Breadcrumbs categoryName={categoryName} />
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <h1 
          className="text-center w-full"
          style={{
            color: 'var(--grayscale-0)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: '1.25',
            letterSpacing: '-1.44px',
          }}
        >
          {title}
        </h1>
        {displayDescription && (
          <p 
            className="text-center w-full"
            style={{
              color: 'var(--grayscale-0)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-normal)',
              lineHeight: '1.5',
              letterSpacing: '-0.32px',
            }}
          >
            {displayDescription}
          </p>
        )}
      </div>
    </div>
  );
}

export function ToolHeader({ categoryName, title, description, excerpt }: ToolHeaderProps) {
  return (
    <div 
      className="relative w-full"
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--elevation-nav)',
      }}
    >
      {/* Background layers */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        {/* White background base */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: 'var(--grayscale-0)',
            borderRadius: 'var(--radius-card)',
          }}
        />
        {/* Gradient overlay image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: 'var(--radius-card)' }}
        >
          <img 
            alt="" 
            className="absolute h-[113.05%] left-0 max-w-none top-0 w-full" 
            src={imgToolNameHeader} 
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[80px] items-center justify-center overflow-clip px-[24px] sm:px-[48px] md:px-[104px] py-[40px] sm:py-[56px] relative size-full">
          <HeaderContent 
            categoryName={categoryName}
            title={title}
            description={description}
            excerpt={excerpt}
          />
        </div>
      </div>
    </div>
  );
}