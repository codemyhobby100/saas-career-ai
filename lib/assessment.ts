import { InterviewQuestion, QuestionDifficulty, AssessmentResult, SkillGap } from '@/types/skills';
import { getQuestionsForRole, getQuestionsBySkill } from './interview-questions';

export function generateAssessment(
  roleId: string, 
  userSkills: string[], 
  difficulty: QuestionDifficulty = QuestionDifficulty.Intermediate,
  questionCount: number = 15
): InterviewQuestion[] {
  // Get role-specific questions for the selected difficulty
  let questions = getQuestionsForRole(roleId, difficulty);
  
  // Ensure coverage of all required skills
  const skillCoverage = new Set(questions.map(q => q.skill));
  const missingSkills = userSkills.filter(skill => !skillCoverage.has(skill));
  
  // Add questions for missing skills
  missingSkills.forEach(skill => {
    const skillQuestions = getQuestionsBySkill(roleId, skill, difficulty);
    if (skillQuestions.length > 0) {
      questions = [...questions, ...skillQuestions];
    }
  });
  
  // Randomize and limit questions
  return shuffleArray(questions).slice(0, questionCount);
}

export function analyzeResults(
  roleId: string,
  questions: InterviewQuestion[],
  answers: number[],
  timesTaken: number[]
): AssessmentResult {
  const results: AssessmentResult = {
    score: 0,
    skillGaps: [],
    strengths: [],
    weaknesses: [],
    recommendations: [],
    questionAnalysis: []
  };

  // Calculate overall score
  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer);
  results.score = (correctAnswers.length / questions.length) * 100;

  // Analyze per skill
  const skillAnalysis = new Map<string, {
    total: number;
    correct: number;
    timeEfficiency: number;
    questions: {
      question: string;
      isCorrect: boolean;
      timeTaken: number;
      explanation: string;
    }[];
  }>();

  questions.forEach((question, index) => {
    const skill = question.skill;
    const isCorrect = answers[index] === question.correctAnswer;
    const timeEfficiency = timesTaken[index] / question.timeLimit;

    const current = skillAnalysis.get(skill) || { 
      total: 0, 
      correct: 0, 
      timeEfficiency: 0,
      questions: []
    };

    skillAnalysis.set(skill, {
      total: current.total + 1,
      correct: current.correct + (isCorrect ? 1 : 0),
      timeEfficiency: current.timeEfficiency + timeEfficiency,
      questions: [...current.questions, {
        question: question.question,
        isCorrect,
        timeTaken: timesTaken[index],
        explanation: question.explanation
      }]
    });

    // Add to question analysis
    results.questionAnalysis.push({
      question: question.question,
      skill: question.skill,
      difficulty: question.difficulty,
      isCorrect,
      timeTaken: timesTaken[index],
      timeLimit: question.timeLimit,
      explanation: question.explanation,
      relatedSkills: question.relatedSkills
    });
  });

  // Identify strengths and weaknesses
  skillAnalysis.forEach((analysis, skill) => {
    const score = (analysis.correct / analysis.total) * 100;
    const timeEfficiency = analysis.timeEfficiency / analysis.total;

    if (score >= 80 && timeEfficiency <= 1.2) {
      results.strengths.push(skill);
    } else if (score < 60 || timeEfficiency > 2) {
      results.weaknesses.push(skill);
      
      // Generate skill gap analysis
      const gap: SkillGap = {
        skill,
        current: score,
        required: 80,
        gap: 80 - score,
        priority: score < 50 ? 'high' : 'medium',
        recommendations: generateRecommendations(skill, score),
        questionAnalysis: analysis.questions
      };
      results.skillGaps.push(gap);

      // Add learning recommendations
      results.recommendations.push({
        skill,
        resources: getResourcesForSkill(skill)
      });
    }
  });

  return results;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateRecommendations(skill: string, score: number): string[] {
  const recommendations: string[] = [];
  
  if (score < 50) {
    recommendations.push(`Focus on ${skill} fundamentals through structured learning`);
    recommendations.push(`Practice ${skill} exercises daily`);
    recommendations.push(`Consider enrolling in a comprehensive ${skill} course`);
  } else if (score < 80) {
    recommendations.push(`Review advanced ${skill} concepts`);
    recommendations.push(`Work on real-world ${skill} projects`);
    recommendations.push(`Participate in ${skill}-focused coding challenges`);
  }
  
  return recommendations;
}

function getResourcesForSkill(skill: string) {
  // This would typically come from a database or API
  // Hardcoded for demonstration
  return [
    {
      title: `${skill} Advanced Course`,
      url: `https://example.com/courses/${skill.toLowerCase()}`,
      type: 'course' as const
    },
    {
      title: `${skill} Documentation`,
      url: `https://docs.example.com/${skill.toLowerCase()}`,
      type: 'documentation' as const
    },
    {
      title: `${skill} Practice Problems`,
      url: `https://practice.example.com/${skill.toLowerCase()}`,
      type: 'practice' as const
    }
  ];
}