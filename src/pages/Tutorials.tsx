import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import projectAutomation from "@/assets/project-automation.jpg";
import projectRobotics from "@/assets/project-robotics.jpg";
import project3DPrinting from "@/assets/project-3dprinting.jpg";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Getting Started with Siemens TIA Portal",
      description: "A comprehensive guide to setting up and programming your first automation project with TIA Portal.",
      category: "Siemens",
      level: "Beginner",
      readTime: "15 min",
      views: "2.1k",
      image: projectAutomation,
      tags: ["TIA Portal", "PLC", "HMI"]
    },
    {
      title: "Advanced HMI Design Patterns",
      description: "Learn industry best practices for designing intuitive and efficient human-machine interfaces.",
      category: "HMI",
      level: "Advanced",
      readTime: "25 min",
      views: "1.8k",
      image: projectAutomation,
      tags: ["HMI", "UX Design", "SCADA"]
    },
    {
      title: "ROS2 for Industrial Automation",
      description: "Introduction to using ROS2 in industrial environments with real-world examples and best practices.",
      category: "Robotics",
      level: "Intermediate",
      readTime: "30 min",
      views: "3.2k",
      image: projectRobotics,
      tags: ["ROS2", "Industrial Robotics", "C++"]
    },
    {
      title: "Safety Systems in Automation",
      description: "Understanding and implementing safety systems in industrial automation projects.",
      category: "Safety",
      level: "Intermediate",
      readTime: "20 min",
      views: "1.5k",
      image: projectAutomation,
      tags: ["Safety", "Standards", "Risk Assessment"]
    },
    {
      title: "3D Printing for Prototyping",
      description: "Using 3D printing effectively for rapid prototyping in engineering projects.",
      category: "Manufacturing",
      level: "Beginner",
      readTime: "18 min",
      views: "2.7k",
      image: project3DPrinting,
      tags: ["3D Printing", "Prototyping", "CAD"]
    },
    {
      title: "CNC Programming Fundamentals",
      description: "Master the basics of CNC programming with G-code examples and machining strategies.",
      category: "CNC",
      level: "Beginner",
      readTime: "22 min",
      views: "1.9k",
      image: projectAutomation,
      tags: ["CNC", "G-code", "Machining"]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Tutorials & Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn automation, robotics, and engineering through practical tutorials and guides.
            </p>
          </div>

          {/* Featured Tutorial */}
          <Card className="mb-12 overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto">
                <img 
                  src={projectAutomation} 
                  alt="Featured Tutorial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-primary text-primary-foreground">
                  Featured
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Complete Guide to Industrial Automation
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A comprehensive series covering everything from basic PLC programming to advanced 
                  SCADA systems. Perfect for engineers starting their automation journey.
                </p>
                <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>45 min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>5.2k views</span>
                  </div>
                  <Badge className={getLevelColor("Intermediate")}>
                    Intermediate
                  </Badge>
                </div>
                 <Link to="/tutorials/sample-tutorial">
                   <Button variant="hero" className="w-fit">
                     Start Learning
                     <BookOpen className="ml-2 w-4 h-4" />
                   </Button>
                 </Link>
              </div>
            </div>
          </Card>

          {/* Tutorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="group overflow-hidden bg-card/50 backdrop-blur-sm hover:bg-card/80 smooth-transition hover:scale-105">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {tutorial.category}
                    </Badge>
                    <Badge className={`${getLevelColor(tutorial.level)} border text-xs`}>
                      {tutorial.level}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold group-hover:text-primary smooth-transition">
                    {tutorial.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{tutorial.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{tutorial.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {tutorial.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                   <Link to={`/tutorials/${index + 1}`}>
                     <Button variant="outline" className="w-full group">
                       Read Tutorial
                       <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                     </Button>
                   </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-16 p-8 text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Want to Contribute?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have knowledge to share? I'm always looking for guest contributors to help 
              grow the automation engineering community.
            </p>
            <Link to="/submit-tutorial">
              <Button variant="hero">
                Submit a Tutorial
              </Button>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorials;