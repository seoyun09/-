export type SubjectType = 'all' | 'algebra' | 'calc1' | 'calc2' | 'prob';

export interface StudentStep {
  stepNum: number;
  stepTitle: string;
  status: 'normal' | 'error';
  statusLabel: string;
  studentMath: string;
  correctMath?: string;
  explanation: string;
  isErrorPoint?: boolean;
  errorType?: string;
  aiComment?: string;
}

export interface Problem {
  id: string; // e.g. "Q14"
  title: string;
  subject: SubjectType;
  subjectName: string; // "미적분Ⅰ"
  chapter: string; // "도함수의 활용 - 접선의 방정식"
  typeTag: string; // "기출 변형 문항"
  points: number; // 4
  difficulty: string; // "난이도 중"
  questionText: string;
  submittedAnswer: string; // "(0, 16)"
  correctAnswer: string; // "(0, -16)"
  errorCategory: string; // "계산 실수"
  reviewRound: string; // "복습 2회차 (미해결)"
  isSolved: boolean;
  aiConfidence: string; // "99.4%"
  rawScanImage: string;
  ocrAccuracy: string; // "98.7%"
  ocrSummary: string;
  studentSteps: StudentStep[];
  errorPatternStats: {
    recentDays: number;
    totalErrors: number;
    breakdown: Array<{
      name: string;
      pct: number;
      hint: string;
      isHigh?: boolean;
    }>;
  };
  optimalSolution: {
    recommendedTime: string;
    targetAudience: string;
    steps: Array<{
      stepNum: string;
      text: string;
      highlight?: boolean;
    }>;
  };
  aiSpeedTip: {
    title: string;
    explanation: string;
    formula: string;
    appliedMath: string;
    highlightText: string;
  };
  conceptReview: {
    title: string;
    points: string[];
  };
  socraticData?: {
    unitTag: string;
    delay: string;
    questionCode: string;
    handwritingOcrQuote: string;
    handwritingImage: string;
    diagnosticOptions: Array<{
      id: string;
      title: string;
      badge: string;
      badgeClass?: string;
      desc: string;
      isRecommended?: boolean;
    }>;
    hints: Array<{
      id: number;
      title: string;
      subtitle: string;
      math: string;
      isUnlocked: boolean;
    }>;
    initialChat: ChatMessage[];
    twinProblems: Array<{
      id: string;
      stage: string;
      badgeColor: string;
      badgeBg: string;
      badgeText: string;
      successRate?: string;
      question: string;
      answer: string;
      explanation: string;
    }>;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'student';
  senderName: string;
  time: string;
  badge?: string;
  content: string;
  mathBox?: string;
  challenge?: {
    title: string;
    desc: string;
    steps: string[];
    question: string;
    suggestedAnswer: string;
    correctAnswer: string;
  };
  bonusTip?: {
    summary: string;
    detail: string;
  };
}
