import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import { Check, X, Edit, ExternalLink, Trash2, FileText, Image, Download } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  file_urls?: string[];
  created_at: string;
  user_id: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
    email: string;
  } | null;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: string;
  tags: string[];
  published: boolean;
  image_url?: string;
  file_urls?: string[];
  created_at: string;
  created_by?: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
    email: string;
  } | null;
}

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
      fetchTutorials();
    }
  }, [isAdmin]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects((data as unknown as Project[]) || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ 
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
          approved_by: status === 'approved' ? user?.id : null
        })
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${status} successfully`,
      });

      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      });
    }
  };

  const fetchTutorials = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select(`
          *,
          profiles:created_by (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTutorials((data as unknown as Tutorial[]) || []);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tutorials",
        variant: "destructive",
      });
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const deleteTutorial = async (tutorialId: string) => {
    try {
      const { error } = await supabase
        .from('tutorials')
        .delete()
        .eq('id', tutorialId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tutorial deleted successfully",
      });

      fetchTutorials();
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      toast({
        title: "Error",
        description: "Failed to delete tutorial",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Access denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingProjects = projects.filter(p => p.status === 'pending');
  const approvedProjects = projects.filter(p => p.status === 'approved');
  const rejectedProjects = projects.filter(p => p.status === 'rejected');

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Manage projects and content</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Projects ({pendingProjects.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved Projects ({approvedProjects.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected Projects ({rejectedProjects.length})
            </TabsTrigger>
            <TabsTrigger value="tutorials">
              Tutorials ({tutorials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onApprove={() => updateProjectStatus(project.id, 'approved')}
                  onReject={() => updateProjectStatus(project.id, 'rejected')}
                  onDelete={() => deleteProject(project.id)}
                  showActions
                />
              ))}
              {pendingProjects.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No pending projects
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <div className="space-y-4">
              {approvedProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onDelete={() => deleteProject(project.id)}
                  showAdminActions
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              {rejectedProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onDelete={() => deleteProject(project.id)}
                  showAdminActions
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials">
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  onDelete={() => deleteTutorial(tutorial.id)}
                  onRefresh={fetchTutorials}
                />
              ))}
              {tutorials.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No tutorials found
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onApprove?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  showAdminActions?: boolean;
}

const ProjectCard = ({ project, onApprove, onReject, onDelete, showActions, showAdminActions }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription>
              By {project.profiles?.first_name} {project.profiles?.last_name} ({project.profiles?.email})
            </CardDescription>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          {project.github_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                GitHub
              </a>
            </Button>
          )}
          {project.demo_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Demo
              </a>
            </Button>
          )}
        </div>

        {project.file_urls && project.file_urls.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attached Files:</Label>
            <div className="flex flex-wrap gap-2">
              {project.file_urls.map((url, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url.includes('.pdf') ? (
                      <FileText className="h-3 w-3 mr-1" />
                    ) : (
                      <Image className="h-3 w-3 mr-1" />
                    )}
                    <Download className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={onApprove}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-3 w-3 mr-1" />
              Approve
            </Button>
            <Button
              onClick={onReject}
              variant="destructive"
              size="sm"
            >
              <X className="h-3 w-3 mr-1" />
              Reject
            </Button>
            {onDelete && (
              <Button
                onClick={onDelete}
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        )}

        {showAdminActions && (
          <div className="flex gap-2 pt-2">
            <EditProjectDialog project={project} onRefresh={() => window.location.reload()} />
            {onDelete && (
              <Button
                onClick={onDelete}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface TutorialCardProps {
  tutorial: Tutorial;
  onDelete: () => void;
  onRefresh: () => void;
}

const TutorialCard = ({ tutorial, onDelete, onRefresh }: TutorialCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: tutorial.title,
    description: tutorial.description,
    content: tutorial.content,
    difficulty: tutorial.difficulty,
    tags: tutorial.tags.join(', '),
    published: tutorial.published,
  });
  const [fileUrls, setFileUrls] = useState<string[]>(tutorial.file_urls || []);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('tutorials')
        .update({
          title: editData.title,
          description: editData.description,
          content: editData.content,
          difficulty: editData.difficulty,
          tags: editData.tags.split(',').map(tag => tag.trim()),
          published: editData.published,
          file_urls: fileUrls,
        })
        .eq('id', tutorial.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tutorial updated successfully",
      });

      setEditOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Error updating tutorial:', error);
      toast({
        title: "Error",
        description: "Failed to update tutorial",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{tutorial.title}</CardTitle>
            <CardDescription>
              By {tutorial.profiles?.first_name} {tutorial.profiles?.last_name} ({tutorial.profiles?.email})
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={tutorial.published ? "default" : "secondary"}>
              {tutorial.published ? "Published" : "Draft"}
            </Badge>
            <Badge variant="outline">{tutorial.difficulty}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{tutorial.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tutorial.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {tutorial.file_urls && tutorial.file_urls.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attached Files:</Label>
            <div className="flex flex-wrap gap-2">
              {tutorial.file_urls.map((url, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8"
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url.includes('.pdf') ? (
                      <FileText className="h-3 w-3 mr-1" />
                    ) : (
                      <Image className="h-3 w-3 mr-1" />
                    )}
                    <Download className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Tutorial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editData.title}
                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editData.description}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={editData.content}
                    onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                  <Input
                    id="edit-tags"
                    value={editData.tags}
                    onChange={(e) => setEditData(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
                <FileUpload
                  onFilesChange={setFileUrls}
                  bucket="tutorial-files"
                  maxFiles={5}
                  existingFiles={fileUrls}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-published"
                    checked={editData.published}
                    onChange={(e) => setEditData(prev => ({ ...prev, published: e.target.checked }))}
                  />
                  <Label htmlFor="edit-published">Published</Label>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            onClick={onDelete}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface EditProjectDialogProps {
  project: Project;
  onRefresh: () => void;
}

const EditProjectDialog = ({ project, onRefresh }: EditProjectDialogProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: project.title,
    description: project.description,
    technologies: project.technologies.join(', '),
    github_url: project.github_url || '',
    demo_url: project.demo_url || '',
    image_url: project.image_url || '',
  });
  const [fileUrls, setFileUrls] = useState<string[]>(project.file_urls || []);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: editData.title,
          description: editData.description,
          technologies: editData.technologies.split(',').map(tech => tech.trim()),
          github_url: editData.github_url || null,
          demo_url: editData.demo_url || null,
          image_url: editData.image_url || null,
          file_urls: fileUrls,
        })
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      setEditOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={editData.title}
              onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editData.description}
              onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="edit-technologies">Technologies (comma-separated)</Label>
            <Input
              id="edit-technologies"
              value={editData.technologies}
              onChange={(e) => setEditData(prev => ({ ...prev, technologies: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="edit-github">GitHub URL</Label>
            <Input
              id="edit-github"
              value={editData.github_url}
              onChange={(e) => setEditData(prev => ({ ...prev, github_url: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="edit-demo">Demo URL</Label>
            <Input
              id="edit-demo"
              value={editData.demo_url}
              onChange={(e) => setEditData(prev => ({ ...prev, demo_url: e.target.value }))}
            />
          </div>
          <FileUpload
            onFilesChange={setFileUrls}
            bucket="project-files"
            maxFiles={5}
            existingFiles={fileUrls}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Admin;