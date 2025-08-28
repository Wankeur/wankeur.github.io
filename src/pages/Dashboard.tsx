import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Settings, Users, FileText, BookOpen, GraduationCap } from "lucide-react";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to access the dashboard.</p>
            <Link to="/auth">
              <Button className="mt-4">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user.user_metadata?.full_name || user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Submit Project Card */}
          <Link to="/submit-project">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Submit Project
                </CardTitle>
                <CardDescription>
                  Share your latest engineering project with the community
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* My Projects Card */}
          <Link to="/my-projects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  My Projects
                </CardTitle>
                <CardDescription>
                  View and manage your submitted projects
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Submit Tutorial Card */}
          <Link to="/submit-tutorial">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Submit Tutorial
                </CardTitle>
                <CardDescription>
                  Share your knowledge with step-by-step tutorials
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* My Tutorials Card */}
          <Link to="/my-tutorials">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  My Tutorials
                </CardTitle>
                <CardDescription>
                  View and manage your submitted tutorials
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Admin Panel (Only for admins) */}
          {isAdmin && (
            <Link to="/admin">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Admin Panel
                  </CardTitle>
                  <CardDescription>
                    Manage projects, tutorials, and users
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;