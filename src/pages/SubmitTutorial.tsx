import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, ImageIcon, MoveUp, MoveDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const SubmitTutorial = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    tags: [] as string[],
  });
  
  const [steps, setSteps] = useState<TutorialStep[]>([
    { id: crypto.randomUUID(), title: "", content: "" }
  ]);
  
  const [newTag, setNewTag] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to submit a tutorial.</p>
            <Button onClick={() => navigate("/auth")} className="mt-4">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addStep = () => {
    setSteps(prev => [...prev, { 
      id: crypto.randomUUID(), 
      title: "", 
      content: "" 
    }]);
  };

  const removeStep = (stepId: string) => {
    if (steps.length > 1) {
      setSteps(prev => prev.filter(step => step.id !== stepId));
    }
  };

  const updateStep = (stepId: string, field: keyof TutorialStep, value: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const currentIndex = steps.findIndex(step => step.id === stepId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]];
    setSteps(newSteps);
  };

  const assignImageToStep = (stepId: string, imageUrl: string) => {
    updateStep(stepId, 'imageUrl', imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Combine steps into content with proper formatting
      const tutorialContent = steps.map((step, index) => {
        let stepContent = `## Step ${index + 1}: ${step.title}\n\n`;
        if (step.imageUrl) {
          stepContent += `![Step ${index + 1}](${step.imageUrl})\n\n`;
        }
        stepContent += `${step.content}\n\n`;
        return stepContent;
      }).join('');

      const { data, error } = await supabase
        .from('tutorials')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            content: tutorialContent,
            difficulty: formData.difficulty,
            tags: formData.tags,
            file_urls: uploadedFiles,
            created_by: user.id,
            published: false,
          }
        ])
        .select();

      if (error) throw error;

      toast.success("Tutorial submitted successfully! It will be reviewed before publication.");
      navigate("/dashboard");
    } catch (error) {
      console.error('Error submitting tutorial:', error);
      toast.error("Failed to submit tutorial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text">Submit Tutorial</h1>
            <p className="text-muted-foreground mt-2">
              Share your knowledge with the engineering community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Tutorial Information</CardTitle>
                <CardDescription>
                  Provide basic details about your tutorial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to PLC Programming"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of what readers will learn..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value: "beginner" | "intermediate" | "advanced") =>
                      setFormData(prev => ({ ...prev, difficulty: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>
                  Upload images, documents, or other resources for your tutorial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload 
                  onFilesChange={setUploadedFiles} 
                  bucket="tutorial-files"
                  existingFiles={uploadedFiles}
                />
              </CardContent>
            </Card>

            {/* Tutorial Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Tutorial Steps</CardTitle>
                <CardDescription>
                  Create step-by-step content. You can assign images to specific steps.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Step {index + 1}</h3>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => moveStep(step.id, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => moveStep(step.id, 'down')}
                          disabled={index === steps.length - 1}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        {steps.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeStep(step.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Step Title *</Label>
                      <Input
                        placeholder="e.g., Configure Hardware Settings"
                        value={step.title}
                        onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Step Content *</Label>
                      <Textarea
                        placeholder="Detailed instructions for this step..."
                        value={step.content}
                        onChange={(e) => updateStep(step.id, 'content', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    {step.imageUrl && (
                      <div className="space-y-2">
                        <Label>Assigned Image</Label>
                        <div className="flex items-center gap-2 p-2 border rounded">
                          <ImageIcon className="h-4 w-4" />
                          <span className="text-sm truncate">{step.imageUrl}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateStep(step.id, 'imageUrl', '')}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )}

                    {!step.imageUrl && uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Assign Image to This Step</Label>
                        <Select onValueChange={(value) => assignImageToStep(step.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an uploaded image" />
                          </SelectTrigger>
                          <SelectContent>
                            {uploadedFiles.map((file, idx) => (
                              <SelectItem key={idx} value={file}>
                                Image {idx + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}

                <Button type="button" onClick={addStep} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Submitting..." : "Submit Tutorial"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitTutorial;