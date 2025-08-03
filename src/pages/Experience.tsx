import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Automation Engineer Intern",
      company: "Desimone Research Center",
      location: "Belgium",
      period: "2023 - 2024",
      type: "Internship",
      description: "Complete programming of a special machine for research and development center, creating prototypes of insulating panels. Worked with Siemens TIA Portal, HMI design, and WinCC Unified.",
      technologies: ["Siemens TIA Portal", "HMI", "WinCC Unified", "SCADA"]
    },
    {
      title: "Automation Project Lead",
      company: "University Final Year Project",
      location: "Belgium",
      period: "2023",
      type: "Academic",
      description: "Led the development of a full custom machine build for research on insulated panels. Managed project timeline, technical specifications, and team coordination.",
      technologies: ["Siemens", "TIA Portal", "HMI", "SCADA", "Project Management"]
    },
    {
      title: "Robotics Research Assistant",
      company: "University Lab",
      location: "Belgium", 
      period: "2022 - Present",
      type: "Research",
      description: "Developing ROS2-based control systems for industrial robots with advanced path planning and collision detection capabilities. Focus on improving automation efficiency.",
      technologies: ["ROS2", "C++", "Python", "Gazebo", "Industrial Robotics"]
    }
  ];

  const education = [
    {
      degree: "Master's in Engineering",
      institution: "University of Engineering",
      location: "Belgium",
      period: "2022 - Present",
      status: "In Progress",
      focus: "Automation and Control Systems"
    },
    {
      degree: "Bachelor's in Automation",
      institution: "Technical Institute",
      location: "Belgium", 
      period: "2019 - 2022",
      status: "Completed",
      focus: "Industrial Automation"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Experience</h1>
            <p className="text-xl text-muted-foreground">
              My journey in automation engineering and industrial systems
            </p>
          </div>

          {/* Work Experience */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8">Work Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end space-y-2 mt-2 lg:mt-0">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <Badge variant="secondary">{exp.type}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-3xl font-semibold mb-8">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end space-y-2 mt-2 lg:mt-0">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.period}</span>
                      </div>
                      <Badge 
                        variant={edu.status === "Completed" ? "default" : "secondary"}
                      >
                        {edu.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    <strong>Focus:</strong> {edu.focus}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Experience;