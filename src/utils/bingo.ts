export function generateUniqueCards(
  words: string[],
  count: number,
  freeSpaceImage?: string,
  themeColor: string = '#4F46E5'
): BingoCard[] {
  if (words.length < 24) {
    throw new Error('At least 24 words are required to generate a bingo card');
  }

  const cards: BingoCard[] = [];
  
  for (let i = 0; i < count; i++) {
    let squares: string[] = [];
    const availableWords = [...words];
    
    // Generate 24 unique squares (excluding center free space)
    for (let j = 0; j < 24; j++) {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      squares.push(availableWords[randomIndex]);
      availableWords.splice(randomIndex, 1);
    }
    
    // Insert free space in the middle (index 12)
    squares.splice(12, 0, 'FREE');
    
    cards.push({
      squares,
      freeSpaceImage,
      themeColor
    });
  }
  
  return cards;
}