"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefcaseIcon, BookOpenIcon, LineChartIcon, UserIcon, SparklesIcon, RocketIcon, BrainIcon, TargetIcon } from "lucide-react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { number: "95%", label: "Success Rate", icon: TargetIcon },
  { number: "50K+", label: "Active Users", icon: UserIcon },
  { number: "24/7", label: "AI Support", icon: BrainIcon },
  { number: "100+", label: "Partner Companies", icon: BriefcaseIcon },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative max-w-7xl mx-auto"
        >
          <div className="text-center">
            <motion.div variants={item}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
                Your Career Journey,{" "}
                <span className="text-primary">Powered by AI</span>
              </h1>
            </motion.div>
            <motion.p
              variants={item}
              className="mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Get personalized job recommendations, improve your resume, and bridge skill gaps with our AI-powered platform.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button size="lg" className="text-lg h-14 px-8" asChild>
                <Link href="/auth?mode=signup">
                  Get Started
                  <RocketIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-7xl mx-auto mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                  <Card className="relative p-6 text-center bg-background/50 backdrop-blur-sm border-primary/10 group-hover:border-primary/20 transition-colors">
                    <Icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <SparklesIcon className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to accelerate your career growth and land your dream job.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BriefcaseIcon className="w-6 h-6" />}
              title="Smart Job Matching"
              description="Get personalized job recommendations based on your skills and experience."
            />
            <FeatureCard
              icon={<UserIcon className="w-6 h-6" />}
              title="Resume Analysis"
              description="Receive AI-powered feedback to optimize your resume and cover letters."
            />
            <FeatureCard
              icon={<BookOpenIcon className="w-6 h-6" />}
              title="Skill Gap Analysis"
              description="Identify and bridge skill gaps with targeted learning recommendations."
            />
            <FeatureCard
              icon={<LineChartIcon className="w-6 h-6" />}
              title="Progress Tracking"
              description="Track your job search progress and application performance."
            />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of professionals who have already accelerated their career growth with CareerAI.
          </p>
          <Button size="lg" className="text-lg h-14 px-8" asChild>
            <Link href="/auth?mode=signup">
              Start Free Trial
              <RocketIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={item}>
      <Card className="p-6 h-full flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
}