import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/experience", label: t("nav.experience") },
    { href: "/tutorials", label: t("nav.tutorials") },
    { href: "/founder", label: t("nav.founder") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t("auth.signedOut"),
        description: t("auth.signedOutDesc"),
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("auth.signOutError"),
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/2eaa4952-8460-41cf-90dd-4ca5fdd3674d.png" 
              alt="DAEDALE Logo" 
              className="w-10 h-10 rounded-lg object-contain"
            />
            <span className="text-xl font-bold gradient-text">DÆDALE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`smooth-transition hover:text-primary ${
                  isActive(item.href) ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {t("nav.dashboard")}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.signOut")}
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {t("nav.signIn")}
                </Button>
              </Link>
            )}
            <Button 
              variant={language === 'en' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setLanguage('en')}
            >
              EN
            </Button>
            <Button 
              variant={language === 'fr' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setLanguage('fr')}
            >
              FR
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block py-2 smooth-transition hover:text-primary ${
                  isActive(item.href) ? "text-primary font-medium" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      {t("nav.dashboard")}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.signOut")}
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    {t("nav.signIn")}
                  </Button>
                </Link>
              )}
              <div className="flex items-center space-x-4 pt-2">
                <Button 
                  variant={language === 'en' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setLanguage('en')}
                >
                  EN
                </Button>
                <Button 
                  variant={language === 'fr' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setLanguage('fr')}
                >
                  FR
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;