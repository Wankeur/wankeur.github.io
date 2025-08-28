import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PlusCircle, Edit, Eye, Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

const MyTutorials = () => {
  const { user } = useAuth();
  const [tutorials, setTutorials] = useState<Tables<"tutorials">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('tutorials')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTutorials(data || []);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
        toast.error("Failed to load your tutorials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, [user]);

  const getStatusColor = (published: boolean) => {
    return published
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to view your tutorials.</p>
            <Link to="/auth">
              <Button className="mt-4">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <p className="text-muted-foreground">Fetching your tutorials...</p>
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
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text">My Tutorials</h1>
              <p className="text-muted-foreground mt-2">
                Manage your submitted tutorials
              </p>
            </div>
            <Link to="/submit-tutorial">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Submit Tutorial
              </Button>
            </Link>
          </div>

          {tutorials.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <h2 className="text-xl font-semibold mb-4">No Tutorials Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any tutorials yet. Share your knowledge with the community!
                </p>
                <Link to="/submit-tutorial">
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Submit Your First Tutorial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="group overflow-hidden bg-card/50 backdrop-blur-sm hover:bg-card/80 smooth-transition">
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    {tutorial.image_url ? (
                      <img 
                        src={tutorial.image_url} 
                        alt={tutorial.title}
                        className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusColor(tutorial.published)} border text-xs`}>
                        {tutorial.published ? 'Published' : 'Under Review'}
                      </Badge>
                      <Badge className={`${getLevelColor(tutorial.difficulty)} border text-xs`}>
                        {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                      </Badge>
                    </div>
                    
                    <div>
                      <CardTitle className="group-hover:text-primary smooth-transition line-clamp-2">
                        {tutorial.title}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-3">
                        {tutorial.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(tutorial.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {tutorial.tags && tutorial.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {tutorial.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {tutorial.tags.length > 3 && (
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                            +{tutorial.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {tutorial.published && (
                        <Link to={`/tutorials/${tutorial.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTutorials;