import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-12 px-4 border-t border-border bg-card/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-primary">DÆDALE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("footer.quickLinks")}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">{t("nav.home")}</Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">{t("nav.about")}</Link>
              <Link to="/projects" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">{t("nav.projects")}</Link>
              <Link to="/experience" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">{t("nav.experience")}</Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2">
              <Link to="/tutorials" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">{t("nav.tutorials")}</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">{t("nav.contact")}</Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">Privacy Policy</Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">Documentation</a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("footer.followMe")}</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">GitHub</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">LinkedIn</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary smooth-transition">Email</a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Alexandre Radermacker. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;