import { FeaturesHeader } from '../shared/ui/features-header';
import { FeaturesHero } from '../widgets/features-hero';
import { FeaturesFooter } from '../widgets/features-footer';
import Why from "./Why";
import AIDirectory from "./AIDirectory";

export default function Features() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <FeaturesHeader />
      <FeaturesHero />
      <Why />
      <AIDirectory />
      <FeaturesFooter />
    </div>
  );
}
