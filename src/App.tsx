import React, { useState } from 'react';
import { Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import { BingoCard } from './components/BingoCard';
import { generateUniqueCards } from './utils/bingo';
import type { BingoCard as BingoCardType } from './types';

function App() {
  const [wordText, setWordText] = useState('');
  const [numberOfCards, setNumberOfCards] = useState(1);
  const [freeSpaceImage, setFreeSpaceImage] = useState<string>();
  const [cards, setCards] = useState<BingoCardType[]>([]);
  const [error, setError] = useState<string>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [themeColor, setThemeColor] = useState('#E31837');
  
  const getWordList = () => {
    return wordText
      .split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFreeSpaceImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    try {
      const wordList = getWordList();
      const generatedCards = generateUniqueCards(wordList, numberOfCards, freeSpaceImage, themeColor);
      setCurrentCardIndex(0);
      setCards(generatedCards);
      setError(undefined);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 print:p-0">
        <div className="mb-8 print:hidden">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Bingo Card Generator</h1>
          
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label htmlFor="words" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Words (one per line)
              </label>
              <textarea
                id="words"
                value={wordText}
                onChange={(e) => setWordText(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-40"
                placeholder="Enter your words here&#10;One word per line&#10;You need at least 24 words"
              />
              <p className="mt-2 text-sm text-gray-500">
                {getWordList().length} words entered
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Free Space Image (optional)
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {freeSpaceImage && (
                  <img
                    src={freeSpaceImage}
                    alt="Free Space Preview"
                    className="h-10 w-10 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Cards
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={numberOfCards}
                onChange={(e) => setNumberOfCards(parseInt(e.target.value) || 1)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-32 sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme Color
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={themeColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                      setThemeColor(value);
                    }
                  }}
                  placeholder="#000000"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-32 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleGenerate}
                disabled={getWordList().length < 24}
                style={{
                  backgroundColor: themeColor,
                  '--tw-ring-color': themeColor
                } as React.CSSProperties}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Generate Cards
              </button>
              
              {cards.length > 0 && (
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Printer className="h-5 w-5 mr-2" />
                  Print Cards
                </button>
              )}
            </div>
          </div>
        </div>

        {cards.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-[650px] mb-4 print:hidden">
              <button
                onClick={handlePrevCard}
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-gray-600">
                Card {currentCardIndex + 1} of {cards.length}
              </div>
              <button
                onClick={handleNextCard}
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="print:mb-0 print-break">
              <BingoCard card={cards[currentCardIndex]} />
            </div>
          </div>
        )}

        <div className="hidden print:block print:visible">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="mb-8 last:mb-0 print-break"
              style={{ pageBreakAfter: 'always' }}
            >
              <BingoCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;