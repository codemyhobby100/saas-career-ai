"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileTextIcon, PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type CoverLetter = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  score: number;
};

export default function CoverLettersPage() {
  const { toast } = useToast();
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([
    {
      id: "1",
      title: "Software Engineer - TechCorp",
      content: "Dear Hiring Manager,\n\nI am writing to express my interest...",
      createdAt: "2025-02-15",
      score: 85,
    },
    {
      id: "2",
      title: "Frontend Developer - StartupX",
      content: "Dear Hiring Team,\n\nI am excited to apply...",
      createdAt: "2025-02-10",
      score: 92,
    },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newLetter, setNewLetter] = useState({ title: "", content: "" });

  const handleCreate = async () => {
    try {
      // TODO: Integrate with Supabase
      const mockLetter = {
        id: Date.now().toString(),
        title: newLetter.title,
        content: newLetter.content,
        createdAt: new Date().toISOString().split("T")[0],
        score: Math.floor(Math.random() * 20) + 80, // Mock score between 80-100
      };

      setCoverLetters([mockLetter, ...coverLetters]);
      setNewLetter({ title: "", content: "" });
      setIsCreating(false);

      toast({
        title: "Success",
        description: "Cover letter created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create cover letter",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Integrate with Supabase
      setCoverLetters(coverLetters.filter(letter => letter.id !== id));
      
      toast({
        title: "Success",
        description: "Cover letter deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete cover letter",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cover Letters</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your cover letters with AI-powered feedback
            </p>
          </div>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                New Cover Letter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Cover Letter</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Title (e.g., Position - Company)"
                    value={newLetter.title}
                    onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write your cover letter..."
                    className="min-h-[300px]"
                    value={newLetter.content}
                    onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleCreate}>Create Cover Letter</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {coverLetters.map((letter) => (
            <Card key={letter.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-5 h-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">{letter.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created on {letter.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Score: {letter.score}%</Badge>
                  <Button variant="ghost" size="icon">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(letter.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Card className="p-4 bg-muted">
                  <pre className="whitespace-pre-wrap text-sm">
                    {letter.content.length > 200
                      ? `${letter.content.slice(0, 200)}...`
                      : letter.content}
                  </pre>
                </Card>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}