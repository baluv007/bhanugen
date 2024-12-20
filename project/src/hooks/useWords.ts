import { useState, useEffect } from 'react';
import { Word } from '../types';
import { fetchRandomWords } from '../services/wordService';

export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWords();
  }, []);

  async function loadWords() {
    try {
      setLoading(true);
      const newWords = await fetchRandomWords();
      setWords(newWords);
      setError(null);
    } catch (err) {
      setError('Failed to load words. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const addWord = (newWord: Omit<Word, 'id' | 'dateAdded' | 'learned'>) => {
    const word: Word = {
      ...newWord,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
      learned: false
    };
    setWords(prev => [...prev, word]);
  };

  const toggleWordLearned = (id: string) => {
    setWords(words.map(word =>
      word.id === id ? { ...word, learned: !word.learned } : word
    ));
  };

  return {
    words,
    loading,
    error,
    refreshWords: loadWords,
    toggleWordLearned,
    addWord
  };
}