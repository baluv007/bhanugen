import React from 'react';
import { QuizResult } from '../types';

interface ProgressChartProps {
  quizResults: QuizResult[];
  totalWords: number;
  learnedWords: number;
}

export function ProgressChart({ quizResults, totalWords, learnedWords }: ProgressChartProps) {
  const averageScore = quizResults.length > 0
    ? quizResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0) / quizResults.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#E7C111] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Words Learned</h3>
          <p className="text-3xl font-bold">{learnedWords}/{totalWords}</p>
          <div className="h-2 bg-gray-200 rounded mt-2">
            <div
              className="h-2 bg-[#E7C111] rounded"
              style={{ width: `${(learnedWords / totalWords) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="bg-[#63EBBB] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Quiz Average</h3>
          <p className="text-3xl font-bold">{averageScore.toFixed(1)}%</p>
          <div className="h-2 bg-gray-200 rounded mt-2">
            <div
              className="h-2 bg-[#63EBBB] rounded"
              style={{ width: `${averageScore}%` }}
            />
          </div>
        </div>
        
        <div className="bg-[#CBA3BA] bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Quizzes Taken</h3>
          <p className="text-3xl font-bold">{quizResults.length}</p>
        </div>
      </div>
      
      {quizResults.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Quiz Results</h3>
          <div className="space-y-2">
            {quizResults.slice(-5).reverse().map((result, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{new Date(result.date).toLocaleDateString()}</span>
                <span className="font-semibold">
                  {result.score}/{result.totalQuestions} ({((result.score / result.totalQuestions) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}