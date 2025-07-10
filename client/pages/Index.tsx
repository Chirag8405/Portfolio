import { Navigation } from "@/components/portfolio/Navigation";
import { Hero } from "@/components/portfolio/Hero";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <div className="snap-start">
          <Hero />
        </div>
        <div className="snap-start">
          <Skills />
        </div>
        <div className="snap-start">
          <Projects />
        </div>
        <div className="snap-start">
          <Experience />
        </div>
        <div className="snap-start">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-12">
        <div className="container mx-auto px-8">
          <div className="text-center text-muted-foreground space-y-4">
            <p className="text-sm">
              website designed and developed by{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                chirag
              </a>
            </p>
            <p className="text-xs opacity-75">
              Built with React, TypeScript, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
