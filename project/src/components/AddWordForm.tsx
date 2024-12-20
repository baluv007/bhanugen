import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Word } from '../types';

interface AddWordFormProps {
  onAddWord: (word: Omit<Word, 'id' | 'dateAdded' | 'learned'>) => void;
  categories: string[];
}

export function AddWordForm({ onAddWord, categories }: AddWordFormProps) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState(categories[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word && definition && category) {
      onAddWord({ word, definition, category });
      setWord('');
      setDefinition('');
      setCategory(categories[0] || '');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid gap-4">
        <div>
          <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-1">
            Word
          </label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#E7C111] focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="definition" className="block text-sm font-medium text-gray-700 mb-1">
            Definition
          </label>
          <textarea
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#E7C111] focus:border-transparent"
            rows={3}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#E7C111] focus:border-transparent"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-[#E7C111] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Word
        </button>
      </div>
    </form>
  );
}