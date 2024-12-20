export interface Word {
  id: string;
  word: string;
  definition: string;
  category: string;
  learned: boolean;
  dateAdded: string;
}

export interface QuizQuestion {
  id: string;
  type: 'definition' | 'category';
  word: string;
  question: string;
  correctAnswer: string;
  options: string[];
}

export interface QuizResult {
  date: string;
  score: number;
  totalQuestions: number;
}