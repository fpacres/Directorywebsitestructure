import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4" style={{ background: 'var(--background)' }}>
        <div className="w-full max-w-[1440px] mx-auto">
          <NavMenu />
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card box-border content-stretch flex flex-col gap-[32px] items-start p-[80px] relative rounded-[32px] w-full" style={{ boxShadow: 'var(--elevation-sm)' }}>
          <h1 className="text-foreground">About EveryDigitalTools</h1>
          <div className="flex flex-col gap-[24px] max-w-[800px]">
            <p className="text-foreground">
              Welcome to EveryDigitalTools — your comprehensive collection of free, online utilities designed to simplify everyday tasks.
            </p>
            <p className="text-foreground">
              Our mission is to provide developers, designers, and digital professionals with easy-to-use tools that enhance productivity and streamline workflows.
            </p>
            <p className="text-foreground">
              From color converters to unit calculators, from AI-powered generators to data formatters, we're constantly expanding our toolkit to meet your needs.
            </p>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}