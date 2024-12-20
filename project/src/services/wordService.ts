import { Word } from '../types';

// Using the Free Dictionary API for word data
const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function fetchRandomWords(): Promise<Word[]> {
  // Common words list for demonstration
  const commonWords = [
    'ephemeral', 'ubiquitous', 'serendipity', 'eloquent', 'resilient',
    'paradigm', 'enigmatic', 'cognizant', 'pragmatic', 'ethereal',
    'ambivalent', 'benevolent', 'cacophony', 'diligent', 'euphoria',
    'fastidious', 'gregarious', 'hierarchy', 'indigenous', 'juxtapose'
  ];

  // Shuffle and take first 20 words
  const selectedWords = [...commonWords]
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  const words: Word[] = [];

  for (const word of selectedWords) {
    try {
      const response = await fetch(`${API_BASE_URL}/${word}`);
      const data = await response.json();
      
      if (data[0]) {
        const definition = data[0].meanings[0]?.definitions[0]?.definition;
        const category = data[0].meanings[0]?.partOfSpeech || 'Other';
        
        words.push({
          id: crypto.randomUUID(),
          word,
          definition: definition || 'Definition not available',
          category: determineCategory(category),
          learned: false,
          dateAdded: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error(`Error fetching word ${word}:`, error);
    }
  }

  return words;
}

function determineCategory(partOfSpeech: string): string {
  const academicPOS = ['noun', 'verb', 'adjective'];
  const casualPOS = ['interjection', 'pronoun'];
  const businessPOS = ['verb', 'noun'];

  if (academicPOS.includes(partOfSpeech.toLowerCase())) return 'Academic';
  if (casualPOS.includes(partOfSpeech.toLowerCase())) return 'Casual';
  if (businessPOS.includes(partOfSpeech.toLowerCase())) return 'Business';
  return 'Other';
}