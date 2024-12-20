import { useState, useEffect } from 'react';
import { Word, QuizQuestion } from '../types';

export function useQuiz(words: Word[]) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (words.length >= 4) {
      generateQuestions();
    }
  }, [words]);

  function generateQuestions() {
    const allQuestions: QuizQuestion[] = [];
    
    // Definition questions
    const definitionQuestions = words.map(word => ({
      id: crypto.randomUUID(),
      type: 'definition',
      word: word.word,
      correctAnswer: word.definition,
      options: getRandomDefinitions(words, word),
      question: `What is the definition of "${word.word}"?`
    }));

    // Usage questions
    const usageQuestions = words.map(word => ({
      id: crypto.randomUUID(),
      type: 'category',
      word: word.word,
      correctAnswer: word.category,
      options: ['Academic', 'Casual', 'Business', 'Other'],
      question: `Which category does "${word.word}" belong to?`
    }));

    // Combine and shuffle questions
    allQuestions.push(...definitionQuestions, ...usageQuestions);
    const shuffledQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 50);

    setQuestions(shuffledQuestions);
  }

  function getRandomDefinitions(words: Word[], currentWord: Word): string[] {
    const otherDefinitions = words
      .filter(w => w.id !== currentWord.id)
      .map(w => w.definition)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return [...otherDefinitions, currentWord.definition]
      .sort(() => Math.random() - 0.5);
  }

  function handleAnswer(answer: string) {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }

    return isCorrect;
  }

  function resetQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setIsComplete(false);
    generateQuestions();
  }

  return {
    currentQuestion,
    questions,
    score,
    isComplete,
    handleAnswer,
    resetQuiz,
    totalQuestions: questions.length
  };
}