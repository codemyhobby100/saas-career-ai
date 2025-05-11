"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileUpIcon, Loader2Icon, CheckCircleIcon, XIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type UserProfile = {
  jobRole: string;
  yearsOfExperience: string;
  skills: string[];
  industry: string;
  careerGoals: string;
};

type AnalysisResult = {
  score: number;
  analysis: string;
};

export default function ResumePage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileComplete, setProfileComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [newSkill, setNewSkill] = useState("");
  const { toast } = useToast();

  const [profile, setProfile] = useState<UserProfile>({
    jobRole: "",
    yearsOfExperience: "",
    skills: [],
    industry: "",
    careerGoals: "",
  });

  useEffect(() => {
    if (analysisResult) {
      const duration = 1500;
      const steps = 60;
      const increment = analysisResult.score / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= analysisResult.score) {
          setCurrentScore(analysisResult.score);
          clearInterval(timer);
        } else {
          setCurrentScore(current);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [analysisResult]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.jobRole || !profile.yearsOfExperience || !profile.industry || !profile.careerGoals) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setProfileComplete(true);
    setActiveTab("upload");
    toast({
      title: "Success",
      description: "Profile information saved successfully",
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setUploading(false);
      setAnalyzing(true);

      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock AI analysis based on user profile
      const mockScore = calculateMockScore(profile);
      const mockAnalysis = generateMockAnalysis(profile);
      setAnalysisResult({
        score: mockScore,
        analysis: mockAnalysis
      });
      setAnalyzing(false);

      toast({
        title: "Success!",
        description: "Resume analyzed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setUploading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hidden sm:flex"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Resume Analysis</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" disabled={profileComplete} className="text-xs sm:text-sm">
              {profileComplete ? <CheckCircleIcon className="w-4 h-4 mr-2" /> : null}
              Profile
            </TabsTrigger>
            <TabsTrigger value="upload" disabled={!profileComplete} className="text-xs sm:text-sm">
              Resume
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="p-4 sm:p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobRole">Desired Job Role</Label>
                  <Input
                    id="jobRole"
                    value={profile.jobRole}
                    onChange={(e) => setProfile({...profile, jobRole: e.target.value})}
                    placeholder="e.g., Frontend Developer, Product Manager"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select
                    value={profile.yearsOfExperience}
                    onValueChange={(value) => setProfile({...profile, yearsOfExperience: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={profile.industry}
                    onValueChange={(value) => setProfile({...profile, industry: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Key Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="careerGoals">Career Goals</Label>
                  <Textarea
                    id="careerGoals"
                    placeholder="Describe your career goals and aspirations..."
                    value={profile.careerGoals}
                    onChange={(e) => setProfile({...profile, careerGoals: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Save Profile & Continue
                </Button>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload">
            <Card className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="resume">Upload your resume (PDF or DOC)</Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      disabled={uploading || analyzing}
                      className="w-full"
                    />
                    {(uploading || analyzing) && <Loader2Icon className="w-6 h-6 animate-spin" />}
                  </div>
                </div>

                {analysisResult && (
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-secondary"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="42"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-primary transition-all duration-1000 ease-out"
                            strokeWidth="8"
                            strokeDasharray={`${currentScore * 2.64}, 264`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="42"
                            cx="50"
                            cy="50"
                            style={{
                              transform: 'rotate(-90deg)',
                              transformOrigin: '50% 50%'
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <span className="text-4xl font-bold">{Math.round(currentScore)}%</span>
                            <p className="text-sm text-muted-foreground">Resume Score</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-semibold">Analysis Results</h3>
                      <Card className="p-4 bg-secondary/50 overflow-x-auto">
                        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: analysisResult.analysis }} />
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function calculateMockScore(profile: UserProfile): number {
  let score = 70; // Base score
  
  // Adjust based on profile completeness
  if (profile.skills.length >= 5) score += 10;
  if (profile.careerGoals.length > 100) score += 5;
  if (profile.yearsOfExperience !== "0-1") score += 5;
  
  // Add some randomness
  score += Math.random() * 10;
  
  return Math.min(Math.max(score, 0), 100); // Ensure score is between 0 and 100
}

function generateMockAnalysis(profile: UserProfile): string {
  const { jobRole, yearsOfExperience, industry, skills } = profile;
  
  return `
    <h4 class="text-lg font-semibold mb-4">Resume Analysis for ${jobRole} Position</h4>
    
    <div class="space-y-4">
      <div>
        <h5 class="font-semibold text-primary">Strengths:</h5>
        <ul class="list-disc pl-5 space-y-2">
          <li>Good alignment with ${industry} industry requirements</li>
          <li>Relevant experience level (${yearsOfExperience} years)</li>
          ${skills.length ? `<li>Strong technical skills in: ${skills.join(", ")}</li>` : ""}
        </ul>
      </div>

      <div>
        <h5 class="font-semibold text-primary">Areas for Improvement:</h5>
        <ul class="list-disc pl-5 space-y-2">
          <li>Consider adding more quantifiable achievements</li>
          <li>Strengthen your professional summary to better target ${jobRole} positions</li>
          <li>Add more industry-specific keywords for better ATS optimization</li>
          ${yearsOfExperience === "0-1" ? "<li>Highlight relevant projects and internships to compensate for limited experience</li>" : ""}
        </ul>
      </div>

      <div>
        <h5 class="font-semibold text-primary">Recommended Actions:</h5>
        <ul class="list-disc pl-5 space-y-2">
          <li>Add metrics and specific outcomes to your achievements</li>
          <li>Include a skills section highlighting your core competencies</li>
          <li>Tailor your experience descriptions to match ${jobRole} requirements</li>
          <li>Use industry-standard terminology from ${industry} sector</li>
        </ul>
      </div>

      <div class="mt-4 p-4 bg-primary/10 rounded-lg">
        <h5 class="font-semibold text-primary">AI-Powered Suggestions:</h5>
        <p class="mt-2">Based on current ${industry} industry trends for ${jobRole} positions, consider highlighting experience with:</p>
        <ul class="list-disc pl-5 mt-2">
          ${industry === "tech" ? `
            <li>Cloud platforms (AWS, Azure, GCP)</li>
            <li>Agile methodologies</li>
            <li>CI/CD practices</li>
          ` : ""}
          ${industry === "finance" ? `
            <li>Financial analysis tools</li>
            <li>Risk management</li>
            <li>Regulatory compliance</li>
          ` : ""}
          ${industry === "healthcare" ? `
            <li>Healthcare IT systems</li>
            <li>HIPAA compliance</li>
            <li>Electronic Health Records (EHR)</li>
          ` : ""}
        </ul>
      </div>
    </div>
  `;
}