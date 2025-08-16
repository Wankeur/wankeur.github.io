import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/CommentSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import projectAutomation from "@/assets/project-automation.jpg";
import projectRobotics from "@/assets/project-robotics.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  file_urls?: string[];
  technologies: string[];
  status: string;
  github_url?: string;
  demo_url?: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Daedale`;
    }
  }, [project]);

  const fetchProject = async () => {
    try {
      // Check if it's a fallback project
      if (id?.startsWith('fallback-')) {
        const fallbackProjects = [
            {
            id: "fallback-1",
            title: "Final Year Automation Project",
            description: "A full custom machine build for research on insulated panels.",
            image_url: projectAutomation,
            file_urls: [projectAutomation],
            technologies: ["Siemens", "TIA Portal", "HMI", "SCADA"],
            status: "approved",
            github_url: "#",
            demo_url: "#",
            created_at: "2024-01-15",
            profiles: {
              first_name: "DÆDALE",
              last_name: "Team"
            }
          },
          {
            id: "fallback-2",
            title: "Industrial Automation System - Desimone",
            description: "Complete programming of a special machine for a research and development center, creating prototypes of insulating panels.",
            image_url: projectAutomation,
            file_urls: [projectAutomation],
            technologies: ["Siemens", "TIA Portal", "HMI", "WinCC Unified"],
            status: "approved",
            github_url: "#",
            demo_url: "#",
            created_at: "2024-01-10",
            profiles: {
              first_name: "DÆDALE",
              last_name: "Team"
            }
          },
          {
            id: "fallback-3",
            title: "ROS2 Robotics Control System",
            description: "A ROS2-based control system for industrial robots with advanced path planning and collision detection capabilities.",
            image_url: projectRobotics,
            file_urls: [projectRobotics],
            technologies: ["ROS2", "C++", "Python", "Gazebo"],
            status: "approved",
            github_url: "#",
            created_at: "2024-01-05",
            profiles: {
              first_name: "DÆDALE",
              last_name: "Team"
            }
          }
        ];

        const fallbackProject = fallbackProjects.find(p => p.id === id);
        if (fallbackProject) {
          setProject(fallbackProject as Project);
          setLoading(false);
          return;
        }
      }

      // Fetch from database for real projects
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles!projects_user_id_fkey (
            first_name,
            last_name
          )
        `)
        .eq('id', id)
        .eq('status', 'approved')
        .maybeSingle();

      if (error) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error",
          description: "Project not found or not accessible",
          variant: "destructive",
        });
        return;
      }

      if (!data) {
        toast({
          title: "Error",
          description: "Project not found",
          variant: "destructive",
        });
        return;
      }

      setProject(data as unknown as Project);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading project...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or isn't available.
            </p>
            <Link to="/projects">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/projects" className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground smooth-transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl font-bold">{project.title}</h1>
                  <Badge className={`${getStatusColor(project.status)} border`}>
                    {project.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {project.profiles?.first_name} {project.profiles?.last_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              {(project.github_url || project.demo_url) && (
                <div className="flex gap-4">
                  {project.github_url && (
                    <Button variant="outline" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.demo_url && (
                    <Button asChild>
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Project Images Gallery */}
            <div className="space-y-4">
              {project.file_urls && project.file_urls.length > 1 ? (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Gallery</h3>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.file_urls.map((imageUrl, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img 
                              src={imageUrl} 
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              ) : (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={project.file_urls?.[0] || project.image_url || "/placeholder.svg"} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection projectId={project.id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;