import React, { useState } from 'react';
import { Book, Brain, BarChart3, RefreshCw } from 'lucide-react';
import { useWords } from './hooks/useWords';
import { useQuiz } from './hooks/useQuiz';
import { WordCard } from './components/WordCard';
import { Quiz } from './components/Quiz';
import { ProgressChart } from './components/ProgressChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { CategoryFilter } from './components/CategoryFilter';
import { QuizFeedback } from './components/QuizFeedback';

function App() {
  const { words, loading, error, refreshWords, toggleWordLearned } = useWords();
  const quiz = useQuiz(words);
  const [activeTab, setActiveTab] = useState<'words' | 'quiz' | 'progress'>('words');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['Academic', 'Casual', 'Business', 'Other'];
  const filteredWords = selectedCategory === 'all'
    ? words
    : words.filter(word => word.category === selectedCategory);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refreshWords} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Vocabulary Builder</h1>
              <button
                onClick={refreshWords}
                className="p-2 text-gray-600 hover:text-[#E7C111]"
                title="Load new words"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('words')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'words' ? 'bg-[#E7C111] text-white' : 'text-gray-600'
                }`}
              >
                <Book className="w-5 h-5" />
                Words
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'quiz' ? 'bg-[#63EBBB] text-white' : 'text-gray-600'
                }`}
              >
                <Brain className="w-5 h-5" />
                Quiz
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'progress' ? 'bg-[#CBA3BA] text-white' : 'text-gray-600'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Progress
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'words' && (
          <>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWords.map(word => (
                <WordCard
                  key={word.id}
                  word={word}
                  onToggleLearned={toggleWordLearned}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'quiz' && words.length >= 4 && !quiz.isComplete && (
          <Quiz
            currentQuestion={quiz.currentQuestion}
            questions={quiz.questions}
            score={quiz.score}
            onAnswer={quiz.handleAnswer}
          />
        )}

        {activeTab === 'quiz' && quiz.isComplete && (
          <QuizFeedback
            score={quiz.score}
            totalQuestions={quiz.totalQuestions}
            onRetry={quiz.resetQuiz}
          />
        )}

        {activeTab === 'quiz' && words.length < 4 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Enough Words</h2>
            <p className="text-gray-600">Add at least 4 words to start the quiz.</p>
          </div>
        )}

        {activeTab === 'progress' && (
          <ProgressChart
            words={words}
            quizResults={quiz.questions.map(q => ({
              date: new Date().toISOString(),
              score: quiz.score,
              totalQuestions: quiz.totalQuestions
            }))}
          />
        )}
      </main>
    </div>
  );
}

export default App;