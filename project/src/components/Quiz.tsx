import React from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  currentQuestion: number;
  questions: QuizQuestion[];
  score: number;
  onAnswer: (answer: string) => void;
}

export function Quiz({
  currentQuestion,
  questions,
  score,
  onAnswer
}: QuizProps) {
  if (!questions.length) return null;

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}/{questions.length}</h2>
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-[#63EBBB] rounded"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-6">{question.question}</h3>
      
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}