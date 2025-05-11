"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpIcon, BriefcaseIcon, FileTextIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const applicationData = [
  { month: "Jan", applications: 12, interviews: 3, offers: 1 },
  { month: "Feb", applications: 15, interviews: 4, offers: 0 },
  { month: "Mar", applications: 20, interviews: 6, offers: 2 },
  { month: "Apr", applications: 18, interviews: 5, offers: 1 },
  { month: "May", applications: 25, interviews: 8, offers: 2 },
  { month: "Jun", applications: 22, interviews: 7, offers: 1 },
];

const skillProgressData = [
  { name: "Technical", score: 85 },
  { name: "Communication", score: 75 },
  { name: "Leadership", score: 65 },
  { name: "Problem Solving", score: 80 },
  { name: "Teamwork", score: 90 },
];

const activityData = [
  { date: "Week 1", applications: 8, responses: 3 },
  { date: "Week 2", applications: 12, responses: 5 },
  { date: "Week 3", applications: 15, responses: 6 },
  { date: "Week 4", applications: 10, responses: 4 },
];

const defaultAxisProps = {
  stroke: "hsl(var(--muted-foreground))",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
  width: 40,
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Upload Resume"
            description="Upload and analyze your resume"
            icon={<FileUpIcon className="w-6 h-6" />}
            href="/dashboard/resume"
          />
          <DashboardCard
            title="Job Matches"
            description="View your personalized job matches"
            icon={<BriefcaseIcon className="w-6 h-6" />}
            href="/dashboard/jobs"
          />
          <DashboardCard
            title="Cover Letters"
            description="Manage your cover letters"
            icon={<FileTextIcon className="w-6 h-6" />}
            href="/dashboard/cover-letters"
          />
          <DashboardCard
            title="Skill Analysis"
            description="View your skill gap analysis"
            icon={<TrendingUpIcon className="w-6 h-6" />}
            href="/dashboard/skills"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Application Progress</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" {...defaultAxisProps} />
                  <YAxis {...defaultAxisProps} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorApplications)"
                  />
                  <Area
                    type="monotone"
                    dataKey="interviews"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorInterviews)"
                  />
                  <Area
                    type="monotone"
                    dataKey="offers"
                    stroke="hsl(var(--chart-3))"
                    fillOpacity={1}
                    fill="url(#colorOffers)"
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Skill Assessment</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillProgressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="name" {...defaultAxisProps} />
                  <YAxis {...defaultAxisProps} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar
                    dataKey="score"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Weekly Activity</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="date" {...defaultAxisProps} />
                  <YAxis {...defaultAxisProps} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="responses"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                  />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  icon, 
  href 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string; 
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-col h-full">
        <div className="mb-4 p-2 rounded-lg bg-primary/10 w-fit">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <Button asChild className="w-full">
          <Link href={href}>Get Started</Link>
        </Button>
      </div>
    </Card>
  );
}