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
    'TWENTY': { row: 2, col: 1 },
    'FIVE': { row: 2, col: 7 },
    'HALF': { row: 3, col: 0 },
    'TEN': { row: 3, col: 5 },
    'TO': { row: 3, col: 9 },
    'PAST': { row: 4, col: 0 },
    'NINE': { row: 4, col: 7 },
    'ONE': { row: 5, col: 0 },
    'SIX': { row: 5, col: 4 },
    'THREE': { row: 5, col: 7 },
    'FOUR': { row: 6, col: 0 },
    // 'FIVE2': { row: 6, col: 4 },
    'TWO': { row: 6, col: 8 },
    'EIGHT': { row: 7, col: 0 },
    'ELEVEN': { row: 7, col: 5 },
    'SEVEN': { row: 8, col: 0 },
    'TWELVE': { row: 8, col: 5 },
    // 'TEN2': { row: 9, col: 0 },
    'OCLOCK': { row: 9, col: 5 },
    // Add other words as needed
  };

  type HourToGridType = {
    [key: number]: string;
  };

  type Position = {
    row: number;
    col: number;
  };

  // Function to determine the current time to the nearest hour
  const getTimeToNearestHour = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    
    // Adjust the hour if the time is 30 minutes past
    if (minute >= 30) {
      hour++;
    }
    
    // Convert 24-hour time to 12-hour format
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // Convert '0' hour to '12'

    return hour;
  };

    // Function to create an array of letters that represent the current time to the nearest hour
    const getHighlightedLetters = (hour: number) => {
      // Map of hours to their respective strings on the grid
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
      
      const hourString = hourToGrid[hour];
      const lettersToHighlight = ['IT', 'IS', hourString, 'OCLOCK'];
      return lettersToHighlight;
    };

  // Define the state for the highlighted letters
  const [highlightedLetters, setHighlightedLetters] = useState<String[]>([]);

// Helper function to check if a position should be highlighted
const isPositionHighlighted = (rowIndex: number, columnIndex: number): boolean => {
  for (const word of highlightedLetters) {
    // Check if the word exists in the mapping
    if (typeof word === 'string' && word in wordsMapping) {
      const startPos = wordsMapping[word as keyof typeof wordsMapping];

      // Debugging: log the word and its start position
      //console.log(`Word: ${word}, Start Position:`, startPos);

      const wordLength = word.length;

      if (
        rowIndex === startPos.row &&
        columnIndex >= startPos.col &&
        columnIndex < startPos.col + wordLength
      ) {
        return true;
      }
    } else {
      // If the word is not found in the mapping, log this information
      console.log(`Word not found in mapping: ${word}`);
    }
  }
  return false;
};



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


    return (
      <><div>Current Hour: {getTimeToNearestHour()}</div><div>
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
                    width: '30px',
                    height: '30px',
                    lineHeight: '30px',
                    border: '1px solid black',
                    margin: '2px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: highlight ? 'white' : 'grey',
                    backgroundColor: highlight ? 'black' : 'transparent',
                  }}
                  tabIndex={0}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div></>
      
    );
  };

export default WordClockGrid;
