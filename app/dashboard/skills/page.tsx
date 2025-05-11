'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level?: string;
  category?: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills');
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        } else if (!response.ok) {
          throw new Error(`Failed to fetch skills: ${response.statusText}`);
        }
        
        const data: Skill[] = await response.json();
        setSkills(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
        console.error("Error fetching skills:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Skills Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Skills Dashboard</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Skills Dashboard</h1>
      
      {skills.length === 0 ? (
        <p className="text-muted-foreground">No skills found. Add some skills to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(skill => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle>{skill.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {skill.level && <p className="text-sm text-muted-foreground">Level: {skill.level}</p>}
                {skill.category && <p className="text-sm text-muted-foreground">Category: {skill.category}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
