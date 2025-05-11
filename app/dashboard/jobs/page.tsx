"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
  ClockIcon,
  BookmarkIcon,
  SendIcon,
  FilterIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  match: number;
  description: string;
  requirements: string[];
};

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    match: 95,
    description: "We're looking for a Senior Frontend Developer to join our team...",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management",
      "Understanding of web performance optimization",
    ],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupX",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    posted: "1 week ago",
    match: 88,
    description: "Join our fast-growing startup as a Full Stack Engineer...",
    requirements: [
      "3+ years of full stack development",
      "Node.js and React experience",
      "Database design skills",
      "AWS or similar cloud experience",
    ],
  },
  {
    id: 3,
    title: "React Developer",
    company: "InnovateLabs",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$80 - $100/hour",
    posted: "3 days ago",
    match: 82,
    description: "Looking for a React Developer to help build our next-gen platform...",
    requirements: [
      "3+ years of React experience",
      "Experience with modern React patterns",
      "Understanding of RESTful APIs",
      "Strong problem-solving skills",
    ],
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    location: "all",
    minMatch: 0,
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                         job.company.toLowerCase().includes(search.toLowerCase());
    const matchesType = filters.type === "all" || job.type === filters.type;
    const matchesLocation = filters.location === "all" || job.location === filters.location;
    const matchesScore = job.match >= filters.minMatch;

    return matchesSearch && matchesType && matchesLocation && matchesScore;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Job Matches</h1>
            <p className="text-muted-foreground mt-2">
              Personalized job recommendations based on your profile
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select
                      value={filters.type}
                      onValueChange={(value) => setFilters({ ...filters, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select
                      value={filters.location}
                      onValueChange={(value) => setFilters({ ...filters, location: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="New York, NY">New York, NY</SelectItem>
                        <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Match Score</Label>
                    <Slider
                      value={[filters.minMatch]}
                      onValueChange={(value) => setFilters({ ...filters, minMatch: value[0] })}
                      max={100}
                      step={5}
                    />
                    <p className="text-sm text-muted-foreground text-right">
                      {filters.minMatch}%
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-grow space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center text-muted-foreground">
                          <BuildingIcon className="w-4 h-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <BriefcaseIcon className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-semibold">
                      {job.match}% Match
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Salary Range: {job.salary}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <BookmarkIcon className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}