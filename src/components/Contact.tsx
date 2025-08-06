import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 px-4" id="contact">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-xl text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">alex.radermacker@daedale.eu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Belgium</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="hover:scale-110 smooth-transition">
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:scale-110 smooth-transition">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:scale-110 smooth-transition">
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Project collaboration, question, etc." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your project or question..." className="min-h-[120px]" />
                </div>
                
                <Button type="submit" variant="hero" className="w-full">
                  {t("contact.send")}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;