import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import projectAutomation from "@/assets/project-automation.jpg";
import projectRobotics from "@/assets/project-robotics.jpg";
import project3DPrinting from "@/assets/project-3dprinting.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  status: string;
  github_url?: string;
  demo_url?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // Fallback projects for when no user-submitted projects are available
  const fallbackProjects = [
    {
      id: "fallback-1",
      title: "Final Year Automation Project",
      description: "A full custom machine build for research on insulated panels.",
      image: projectAutomation,
      technologies: ["Siemens", "TIA Portal", "HMI", "SCADA"],
      status: "Completed" as const,
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      id: "fallback-2",
      title: "Industrial Automation System - Desimone",
      description: "Complete programming of a special machine for a research and development center, creating prototypes of insulating panels.",
      image: projectAutomation,
      technologies: ["Siemens", "TIA Portal", "HMI", "WinCC Unified"],
      status: "Completed" as const,
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      id: "fallback-3",
      title: "ROS2 Robotics Control System",
      description: "A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.",
      image: projectRobotics,
      technologies: ["ROS2", "C++", "Python", "Gazebo"],
      status: "In Progress" as const,
      links: {
        github: "#"
      }
    }
  ];

  useEffect(() => {
    fetchApprovedProjects();
  }, []);

  const fetchApprovedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'approved')
        .order('approved_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="py-20 px-4" id="projects">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t("projects.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">{t("common.loading")}</p>
            </div>
          ) : (
            displayProjects.map((project) => (
              <ProjectCard 
                key={project.id || project.title}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image_url || project.image || projectRobotics}
                technologies={project.technologies}
                status={project.status}
                links={{
                  github: project.github_url || project.links?.github,
                  demo: project.demo_url || project.links?.demo
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;