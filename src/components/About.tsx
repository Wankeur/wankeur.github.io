import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Users, Lightbulb } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4" id="about">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t("about.title")}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">{t("about.mission")}</h3>
              <p className="text-muted-foreground">{t("about.missionDesc")}</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">{t("about.community")}</h3>
              <p className="text-muted-foreground">{t("about.communityDesc")}</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">{t("about.innovation")}</h3>
              <p className="text-muted-foreground">{t("about.innovationDesc")}</p>
            </Card>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold">{t("about.projectVision")}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("about.projectVisionDesc")}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;