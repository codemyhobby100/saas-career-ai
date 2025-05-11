import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpenIcon, BriefcaseIcon, RocketIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-8">
            About CareerAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We&apos;re revolutionizing the job search process with AI-powered tools and insights to help you land your dream job.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                CareerAI is dedicated to empowering job seekers with cutting-edge AI technology. We believe everyone deserves access to professional career guidance and tools that maximize their potential.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <RocketIcon className="w-6 h-6 text-primary" />
                  <span>Optimize your job search with AI insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpenIcon className="w-6 h-6 text-primary" />
                  <span>Continuous learning and skill development</span>
                </li>
                <li className="flex items-center gap-3">
                  <BriefcaseIcon className="w-6 h-6 text-primary" />
                  <span>Personalized career guidance</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-2">90%</h3>
                <p className="text-muted-foreground">Success rate in improving resumes</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-2">50K+</h3>
                <p className="text-muted-foreground">Active users</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-2">24/7</h3>
                <p className="text-muted-foreground">AI-powered assistance</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Partner companies</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Sarah Johnson"
              role="CEO & Founder"
              description="Former tech recruiter with 10+ years of experience in talent acquisition."
            />
            <TeamMember
              name="Michael Chen"
              role="CTO"
              description="AI researcher and engineer with expertise in NLP and machine learning."
            />
            <TeamMember
              name="Emily Rodriguez"
              role="Head of Product"
              description="Career coach and product strategist focused on user experience."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamMember({ name, role, description }: { name: string; role: string; description: string }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
          <UsersIcon className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-primary mb-2">{role}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}