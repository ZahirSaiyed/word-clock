'use client';
import React, { useState } from 'react';

const WordClockGrid: React.FC = () => {
  // Define the grid of letters
  const grid = [
    ['I', 'T', 'L', 'I', 'S', 'A', 'S', 'T', 'I', 'M', 'E'],
    ['A', 'C', 'Q', 'U', 'A', 'R', 'T', 'E', 'R', 'D', 'C'],
    ['T', 'W', 'E', 'N', 'T', 'Y', 'F', 'I', 'V', 'E', 'X'],
    ['H', 'A', 'L', 'B', 'S', 'T', 'E', 'N', 'F', 'T', 'O'],
    ['P', 'A', 'S', 'T', 'E', 'R', 'U', 'N', 'I', 'N', 'E'],
    ['O', 'N', 'E', 'S', 'I', 'X', 'T', 'H', 'R', 'E', 'E'],
    ['F', 'O', 'U', 'R', 'F', 'I', 'V', 'E', 'T', 'W', 'O'],
    ['E', 'I', 'G', 'H', 'T', 'E', 'L', 'E', 'V', 'E', 'N'],
    ['S', 'E', 'V', 'E', 'N', 'T', 'W', 'E', 'L', 'V', 'E'],
    ['T', 'E', 'N', 'S', 'E', 'O\'', 'C', 'L', 'O', 'C', 'K'],
  ];

  // Define the state for the highlighted letters
  const [highlightedLetters, setHighlightedLetters] = useState<string[]>([]);

  // Function to handle letter click
  const handleLetterClick = (letter: string) => {
    // Check if the letter is already highlighted
    if (highlightedLetters.includes(letter)) {
      // Remove the letter from the highlighted letters
      setHighlightedLetters((prevHighlightedLetters) =>
        prevHighlightedLetters.filter((l) => l !== letter)
      );
    } else {
      // Add the letter to the highlighted letters
      setHighlightedLetters((prevHighlightedLetters) => [...prevHighlightedLetters, letter]);
    }
  };

  // Function to handle clear all click
  const handleClearAllClick = () => {
    // Clear all the highlighted letters
    setHighlightedLetters([]);
  };

  return (
    <div>
      {/* Render the grid of letters */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((letter, columnIndex) => (
            <div
              key={columnIndex}
              onClick={() => handleLetterClick(letter)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                margin: '2px',
                textAlign: 'center',
                cursor: 'pointer',
                color: highlightedLetters.includes(letter) ? 'white' : 'grey',
              }}
              role="button"
              tabIndex={0}
              aria-pressed={highlightedLetters.includes(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}

      {/* Render the clear all button */}
      <button onClick={handleClearAllClick}>Clear All</button>
    </div>
  );
};

export default WordClockGrid;
