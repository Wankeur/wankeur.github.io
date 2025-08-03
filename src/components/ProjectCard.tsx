import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: "Completed" | "In Progress" | "Planning" | "approved" | "pending";
  links?: {
    github?: string;
    demo?: string;
  };
}

const ProjectCard = ({ id, title, description, image, technologies, status, links }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Planning":
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm hover:bg-card/80 smooth-transition hover:scale-105 hover:shadow-2xl">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold group-hover:text-primary smooth-transition">
            {title}
          </h3>
          <Badge className={`${getStatusColor(status)} border`}>
            {status}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          {id && (
            <Button variant="default" size="sm" className="flex-1" asChild>
              <Link to={`/projects/${id}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Link>
            </Button>
          )}
          {links?.github && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {links?.demo && (
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href={links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;