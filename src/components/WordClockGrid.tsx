'use client';
import React, { useState, useEffect } from 'react';

const WordClockGrid: React.FC = () => {
  // Define the grid of letters
  const grid = [
    ['I', 'T', 'L', 'I', 'S', 'A', 'S', 'T', 'I', 'M', 'E'],
    ['A', 'C', 'Q', 'U', 'A', 'R', 'T', 'E', 'R', 'D', 'C'],
    ['T', 'W', 'E', 'N', 'T', 'Y', 'F', 'I', 'V', 'E', 'X'],
    ['H', 'A', 'L', 'F', 'S', 'T', 'E', 'N', 'F', 'T', 'O'],
    ['P', 'A', 'S', 'T', 'E', 'R', 'U', 'N', 'I', 'N', 'E'],
    ['O', 'N', 'E', 'S', 'I', 'X', 'T', 'H', 'R', 'E', 'E'],
    ['F', 'O', 'U', 'R', 'F', 'I', 'V', 'E', 'T', 'W', 'O'],
    ['E', 'I', 'G', 'H', 'T', 'E', 'L', 'E', 'V', 'E', 'N'],
    ['S', 'E', 'V', 'E', 'N', 'T', 'W', 'E', 'L', 'V', 'E'],
    ['T', 'E', 'N', 'S', 'E', 'O\'', 'C', 'L', 'O', 'C', 'K'],
  ];

  const wordsMapping = {
    'IT': { row: 0, col: 0 },
    'IS': { row: 0, col: 3 },
    'A': { row: 1, col: 0 },
    'QUARTER': { row: 1, col: 2 },
    'TWENTY': { row: 2, col: 0 },
    'FIVE2': { row: 2, col: 6 },
    'HALF': { row: 3, col: 0 },
    'TEN2': { row: 3, col: 5 },
    'TO': { row: 3, col: 9 },
    'PAST': { row: 4, col: 0 },
    'NINE': { row: 4, col: 7 },
    'ONE': { row: 5, col: 0 },
    'SIX': { row: 5, col: 4 },
    'THREE': { row: 5, col: 7 },
    'FOUR': { row: 6, col: 0 },
    'FIVE': { row: 6, col: 4 },
    'TWO': { row: 6, col: 8 },
    'EIGHT': { row: 7, col: 0 },
    'ELEVEN': { row: 7, col: 5 },
    'SEVEN': { row: 8, col: 0 },
    'TWELVE': { row: 8, col: 5 },
    'TEN': { row: 9, col: 0 },
    'OCLOCK': { row: 9, col: 5 },
    // Add other words as needed
  };

  type HourToGridType = {
    [key: number]: string;
  };

  // Function to determine the current time to the nearest hour
  const getTimeToNearestHour = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    
      // Logic to decide which minute phrase to use
  let minutePhrase = '';
  if (minute < 5) {
    minutePhrase = 'OCLOCK';
  } else if (minute < 7) {
    minutePhrase = 'FIVE2 PAST';
  } else if (minute < 13) {
    minutePhrase = 'TEN2 PAST';
  }
  else if (minute < 20) {
    minutePhrase = 'QUARTER PAST';
  }
  else if (minute < 26) {
    minutePhrase = 'TWENTY PAST';
  } else if (minute < 35) {
    minutePhrase = 'HALF PAST';
  } else if (minute < 45) {
    minutePhrase = 'TWENTY TO';
    hour++;
  } else if (minute < 50) {
    minutePhrase = 'QUARTER TO';
    hour++;
  }
  else if (minute < 55) {
    minutePhrase = 'TEN2 TO';
    hour++;
  } else {
    minutePhrase = 'FIVE2 TO';
    hour++;
  }
    
    // Convert 24-hour time to 12-hour format
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // Convert '0' hour to '12'

    // return hour;
    return { hour, minutePhrase };
  };

  const getHighlightedLetters = (time: { hour: any; minutePhrase: any; }) => {
     //     // Map of hours to their respective strings on the grid
      const hourToGrid:HourToGridType = {
        1: 'ONE',
        2: 'TWO',
        3: 'THREE',
        4: 'FOUR',
        5: 'FIVE',
        6: 'SIX',
        7: 'SEVEN',
        8: 'EIGHT',
        9: 'NINE',
        10: 'TEN',
        11: 'ELEVEN',
        12: 'TWELVE'
      };
    const { hour, minutePhrase } = time;
    const hourString = hourToGrid[hour];
    //const hourPosition = wordsMapping[hourString as keyof typeof wordsMapping];

    let minuteWords = minutePhrase.split(' ');
    let minutePositions = minuteWords.map((word: string | number) => wordsMapping[word as keyof typeof wordsMapping]);
    console.log(minutePositions);
    return ["IT", "IS", ...minuteWords, hourString];
  };

  // Define the state for the highlighted letters
  const [highlightedLetters, setHighlightedLetters] = useState<String[]>([]);

  // Helper function to check if a position should be highlighted
  const isPositionHighlighted = (rowIndex: number, columnIndex: number): boolean => {
  for (let word of highlightedLetters) {
    // Check if the word exists in the mapping
    if (typeof word === 'string' && word in wordsMapping) {
      const startPos = wordsMapping[word as keyof typeof wordsMapping];

      word = word.replace('2', ''); // Remove the '2' from 'FIVE2' for the length check
      const wordLength = word.length;

      if (
        rowIndex === startPos.row &&
        columnIndex >= startPos.col &&
        columnIndex < startPos.col + wordLength
      ) {
        return true;
      }
    } 
  }
  return false;
  };

  // Update the highlighted letters every minute
  useEffect(() => {
  const updateHighlightedWords = () => {
    const hour = getTimeToNearestHour();
    const lettersToHighlight = getHighlightedLetters(hour);
    setHighlightedLetters(lettersToHighlight.map((letter) => letter.toString()));
  };

  updateHighlightedWords(); // Initial update
  const intervalId = setInterval(updateHighlightedWords, 60000); // Update every minute

  return () => clearInterval(intervalId);
  }, []);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 600 : false;

  return (
    <div>
        {/* Render the grid of letters */}
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((letter, columnIndex) => {
              // Check if this position should be highlighted
              const highlight = isPositionHighlighted(rowIndex, columnIndex);

              return (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  style={{
                    width: isMobile ? '30px' : '50px',
                    height: isMobile ? '30px' : '50px',
                    lineHeight: isMobile ? '30px' : '50px',
                    fontSize: isMobile ? '15px' : '20px',
                    border: '1px solid black',
                    margin: '2px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: highlight ? 'white' : 'grey',
                    backgroundColor: highlight ? 'black' : 'transparent',
                    display: 'flex',
                    alignItems: 'center', // Helps with vertical centering
                    justifyContent: 'center', // Helps with horizontal centering
                  }}
                  tabIndex={0}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
  );
};

export default WordClockGrid;
