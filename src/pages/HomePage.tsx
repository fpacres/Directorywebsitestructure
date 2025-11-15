import NavMenu from '../components/NavMenu';
import { LandingHero } from '../widgets/landing-hero';
import { ToolCategories } from '../widgets/tool-categories';
import { AICategories } from '../widgets/ai-categories';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <NavMenu />
      
      <LandingHero />
      
      {/* Tool Categories Section */}
      <ToolCategories />
      
      {/* AI Directory Section */}
      <AICategories />
      
      <Footer />
    </div>
  );
}