import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

interface QuizFeedbackProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

export function QuizFeedback({ score, totalQuestions, onRetry }: QuizFeedbackProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="text-center py-8">
      <Trophy className="w-16 h-16 text-[#E7C111] mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-lg mb-6">
        You scored {score} out of {totalQuestions} ({percentage.toFixed(1)}%)
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#63EBBB] text-white rounded-md hover:bg-opacity-90"
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
}