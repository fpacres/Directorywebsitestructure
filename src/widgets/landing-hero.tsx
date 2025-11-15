import heroBackground from 'figma:asset/974ed41b38c8036ad37cb7df9603a15b873551fa.png';
import { FloatingCards } from "../shared/ui/floating-cards";
import { HeroSearch } from "../shared/ui/hero-search";

export function LandingHero() {
  return (
    <section className="w-full rounded-[16px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden" style={{ background: 'var(--foreground)' }}>
      <div 
        className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-20 gap-8 lg:gap-12"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Left Content */}
        <div className="flex flex-col gap-4 sm:gap-6 w-full lg:max-w-[500px]">
          {/* Badge */}
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm self-start" 
               style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <span style={{ color: 'white' }} className="text-sm sm:text-base">
              71+ Free Digital Tools Across All Categories
            </span>
          </div>

          {/* Heading */}
          <h2 style={{ color: 'white', margin: 0 }} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
            Digital Tools for Every Task
          </h2>

          {/* Description */}
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }} className="text-sm sm:text-base">
            Welcome to Every Digital Tools — your comprehensive collection of free, online utilities designed to simplify everyday tasks. From text and code formatters to unit converters and calculators, our digital tools are fast, private, and require no sign-up.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button 
              className="px-6 py-3 rounded-[var(--radius-button)] w-full sm:w-auto transition-all hover:opacity-90 hover:shadow-lg cursor-pointer"
              style={{ background: 'white', color: 'var(--foreground)' }}
            >
              View Digital Tools
            </button>
            <button 
              className="px-6 py-3 rounded-[var(--radius-button)] backdrop-blur-sm w-full sm:w-auto transition-all hover:bg-opacity-90 cursor-pointer"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              AI Tools Directory
            </button>
          </div>
        </div>

        {/* Right - Floating Cards - Hidden on mobile */}
        <div className="relative flex-1 h-[300px] sm:h-[350px] lg:h-[400px] w-full lg:w-auto hidden lg:block">
          <FloatingCards />
        </div>
      </div>
    </section>
  );
}