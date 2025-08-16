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
  file_urls?: string[];
  technologies: string[];
  status: string;
  github_url?: string;
  demo_url?: string;
  profiles?: { first_name: string; last_name: string } | null;
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
        .select(`
          id, title, description, image_url, file_urls, technologies, status, github_url, demo_url,
          profiles:profiles!projects_user_id_fkey ( first_name, last_name )
        `)
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
                key={project.id || (project as any).title}
                id={(project as any).id}
                title={(project as any).title}
                description={(project as any).description}
                image={(project as any).file_urls?.[0] || (project as any).image_url || (project as any).image || projectRobotics}
                technologies={(project as any).technologies}
                status={(project as any).status}
                author={(project as any).profiles ? `${(project as any).profiles?.first_name || ''} ${(project as any).profiles?.last_name || ''}`.trim() : 'DÆDALE Team'}
                links={{
                  github: (project as any).github_url || (project as any).links?.github,
                  demo: (project as any).demo_url || (project as any).links?.demo
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