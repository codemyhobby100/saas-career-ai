export enum QuestionDifficulty {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
}

export enum QuestionType {
  Technical = "Technical",
  Behavioral = "Behavioral",
  Scenario = "Scenario",
  SystemDesign = "System Design",
  Coding = "Coding"
}

export interface InterviewQuestion {
  id: string;
  role: string;
  skill: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
  timeLimit: number;
  relatedSkills: string[];
}

export interface Role {
  id: string;
  title: string;
  category: string;
  requiredSkills: string[];
  description: string;
  industryBenchmark: { [key: string]: number };
}

export interface Skill {
  name: string;
  proficiency: number;
  verified: boolean;
  lastTested?: string;
  testScore?: number;
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
  questionAnalysis: {
    question: string;
    isCorrect: boolean;
    timeTaken: number;
    explanation: string;
  }[];
}

export interface QuestionAnalysis {
  question: string;
  skill: string;
  difficulty: QuestionDifficulty;
  isCorrect: boolean;
  timeTaken: number;
  timeLimit: number;
  explanation: string;
  relatedSkills: string[];
}

export interface AssessmentResult {
  score: number;
  skillGaps: SkillGap[];
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    skill: string;
    resources: {
      title: string;
      url: string;
      type: 'course' | 'documentation' | 'practice' | 'tutorial';
    }[];
  }[];
  questionAnalysis: QuestionAnalysis[];
}