import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import projectAutomation from "@/assets/project-automation.jpg";

const TutorialDetail = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState<Tables<"tutorials"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorial = async () => {
      if (!id) return;
      
      try {
        let query;
        
        // If the id is a UUID, fetch by id, otherwise fetch the first tutorial
        if (id.includes('-')) {
          query = supabase
            .from('tutorials')
            .select('*')
            .eq('id', id)
            .eq('published', true)
            .single();
        } else {
          query = supabase
            .from('tutorials')
            .select('*')
            .eq('published', true)
            .limit(1)
            .single();
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching tutorial:', error);
          return;
        }
        
        setTutorial(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  useEffect(() => {
    if (tutorial) {
      document.title = `${tutorial.title} - Daedale`;
    }
  }, [tutorial]);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <p className="text-muted-foreground">Fetching tutorial content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tutorial Not Found</h2>
            <p className="text-muted-foreground mb-6">The tutorial you're looking for doesn't exist.</p>
            <Link to="/tutorials">
              <Button>Back to Tutorials</Button>
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
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link to="/tutorials" className="inline-flex items-center mb-8 text-muted-foreground hover:text-primary smooth-transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tutorials
          </Link>

          {/* Tutorial Header */}
          <Card className="overflow-hidden mb-8">
            <div className="aspect-video">
              <img 
                src={tutorial.image_url || projectAutomation} 
                alt={tutorial.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = projectAutomation;
                }}
              />
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">Tutorial</Badge>
                <Badge className={`${getLevelColor(tutorial.difficulty)} border`}>
                  {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                </Badge>
                {tutorial.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{tutorial.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{tutorial.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>DÆDALE Team</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(tutorial.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>15 min read</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Tutorial Content */}
          <Card className="p-8 mb-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {tutorial.content}
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <CommentSection 
            projectId={tutorial.id}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TutorialDetail;