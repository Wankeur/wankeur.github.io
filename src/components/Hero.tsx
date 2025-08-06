import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import logoImage from "@/assets/logo-daedale.png";
import { useLanguage } from "@/contexts/LanguageContext";
const Hero = () => {
  const {
    t
  } = useLanguage();
  return <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold">
                {t("hero.welcome")} <span className="gradient-text">DÆDALE</span>
              </h1>
              <p className="text-xl text-accent">
                {t("hero.subtitle")}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("hero.description")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground">
                  {t("hero.viewProjects")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="group border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Contact
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 flex items-center justify-center glow-effect">
                <div className="text-center space-y-6">
                  {/* Original DÆDALE Logo */}
                  <div className="w-80 h-80 mx-auto flex items-center justify-center">
                    <img src={logoImage} alt="DÆDALE Logo" className="max-w-full max-h-full object-contain filter brightness-110" />
                  </div>
                  
                </div>
              </div>
              
              {/* Floating elements */}
              
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;