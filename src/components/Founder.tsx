import SkillBadge from "./SkillBadge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Founder = () => {
  const { t } = useLanguage();
  const skills = [
    "Automation", "Siemens", "Beckhoff", "C / C++", "Python", 
    "Industrial Robotics", "ROS2", "3D Printing", "CNC machines"
  ];

  return (
    <section className="py-20 px-4" id="founder">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{t("founder.title")}</h2>
          
          <Card className="p-8 bg-card/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Text content */}
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("founder.bio1")}
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("founder.bio2")}
                </p>
              </div>

              {/* Skills section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">{t("founder.skillsTitle")}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <SkillBadge 
                      key={skill} 
                      skill={skill} 
                      variant={index % 3 === 0 ? "featured" : "default"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Founder;