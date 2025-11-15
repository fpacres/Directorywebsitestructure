import NavMenu from '../components/NavMenu';
import Footer from '../components/Footer';

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <NavMenu />
      
      <div className="bg-card box-border content-stretch flex flex-col gap-[32px] items-center justify-center p-[80px] relative rounded-[32px] w-full min-h-[500px]" style={{ boxShadow: 'var(--elevation-sm)' }}>
        <h1 className="text-foreground">Blog</h1>
        <p className="text-muted-foreground text-center max-w-[600px]">
          Coming soon! We're working on bringing you helpful articles, tutorials, and insights about digital tools and AI.
        </p>
      </div>
      
      <Footer />
    </div>
  );
}
