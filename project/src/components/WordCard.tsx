import React from 'react';
import { Card, BookOpen } from 'lucide-react';
import { Word } from '../types';

interface WordCardProps {
  word: Word;
  onToggleLearned: (id: string) => void;
}

export function WordCard({ word, onToggleLearned }: WordCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{word.word}</h3>
        <button
          onClick={() => onToggleLearned(word.id)}
          className={`p-2 rounded-full ${
            word.learned ? 'bg-[#63EBBB]' : 'bg-gray-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-600 mb-3">{word.definition}</p>
      <div className="flex items-center justify-between">
        <span
          className="px-3 py-1 rounded-full text-sm"
          style={{ backgroundColor: '#CBA3BA' }}
        >
          {word.category}
        </span>
        <span className="text-sm text-gray-500">
          Added: {new Date(word.dateAdded).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}