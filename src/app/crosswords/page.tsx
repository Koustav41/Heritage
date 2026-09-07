'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Award, CheckCircle2, RotateCcw, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { CANONICAL_CROSSWORD } from '@/lib/data/crossword-data';
import { usePorjotok } from '@/lib/store/porjotok-context';

export default function CrosswordsPage() {
  const { addPoints } = usePorjotok();
  const board = CANONICAL_CROSSWORD;
  const rows = board.gridSize.rows;
  const cols = board.gridSize.cols;

  // Initial user grid filled with empty strings for active cells and '#' for blocked
  const [userGrid, setUserGrid] = useState<string[][]>(() => {
    return board.gridSolution.map(row => 
      row.map(cell => cell === '#' ? '#' : '')
    );
  });

  const [validationResults, setValidationResults] = useState<{ isComplete: boolean; message: string } | null>(null);
  const [activeClueId, setActiveClueId] = useState<string | null>(board.clues[0].id);

  const handleCellChange = (r: number, c: number, value: string) => {
    const char = value.toUpperCase().slice(-1);
    setUserGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = char;
      return next;
    });
  };

  const handleCheckSolution = () => {
    let allCorrect = true;
    let filledCount = 0;
    let totalPlayable = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board.gridSolution[r][c] !== '#') {
          totalPlayable++;
          if (userGrid[r][c] === board.gridSolution[r][c]) {
            filledCount++;
          } else {
            allCorrect = false;
          }
        }
      }
    }

    if (allCorrect) {
      setValidationResults({
        isComplete: true,
        message: '🎉 Flawless! You solved the Bengal Heritage Crossword! +50 Points awarded.'
      });
      addPoints(50, 'Solved Bengal Heritage Crossword');
    } else {
      setValidationResults({
        isComplete: false,
        message: `${filledCount} of ${totalPlayable} letters are correct. Keep going or check the clues!`
      });
    }
  };

  const handleRevealSolution = () => {
    setUserGrid(board.gridSolution.map(row => [...row]));
    setValidationResults({
      isComplete: true,
      message: 'Solution revealed! Review the answers and historical connections.'
    });
  };

  const handleReset = () => {
    setUserGrid(board.gridSolution.map(row => row.map(cell => cell === '#' ? '#' : '')));
    setValidationResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Crossword Engine • Spec 1.10 & 33</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Bengal Cultural Crossword
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
          Fill in the letters using the historical clues below. Test your grasp on Bengal’s classical textiles, crafts, sweets, and music.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 8x8 Grid Canvas (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
          
          <div className="inline-block mx-auto border-2 border-stone-800 dark:border-stone-700 rounded-xl overflow-hidden shadow-md">
            <div className="grid grid-cols-8 gap-0 bg-stone-900">
              {userGrid.map((row, rIdx) => 
                row.map((cell, cIdx) => {
                  const isBlocked = cell === '#';
                  // Check if cell has a starting clue number
                  const startingClue = board.clues.find(cl => cl.row === rIdx && cl.col === cIdx);

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`relative w-9 h-9 sm:w-11 sm:h-11 border border-stone-300 dark:border-stone-800 flex items-center justify-center font-black text-sm sm:text-base ${
                        isBlocked ? 'bg-stone-900 dark:bg-stone-950' : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white'
                      }`}
                    >
                      {startingClue && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                          {startingClue.number}
                        </span>
                      )}

                      {!isBlocked && (
                        <input
                          type="text"
                          maxLength={1}
                          value={cell}
                          onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                          className="w-full h-full text-center bg-transparent border-none outline-none font-bold uppercase focus:bg-amber-100 dark:focus:bg-amber-950/60"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Validation Feedback */}
          {validationResults && (
            <div className={`p-4 rounded-2xl text-xs font-semibold ${
              validationResults.isComplete 
                ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200' 
                : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
            }`}>
              {validationResults.message}
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleCheckSolution}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Check Answers
            </button>
            <button
              onClick={handleRevealSolution}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-semibold text-xs transition-colors"
            >
              Reveal All
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-semibold text-xs transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

        </div>

        {/* Right: Clues Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Across Clues */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 pb-2 border-b border-stone-100 dark:border-stone-800">
              Across Clues
            </h3>
            <div className="space-y-3">
              {board.clues.filter(c => c.direction === 'ACROSS').map(clue => (
                <div
                  key={clue.id}
                  onClick={() => setActiveClueId(clue.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeClueId === clue.id 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-100 font-semibold' 
                      : 'border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="font-bold text-amber-600 mr-2">{clue.number}.</span>
                  <span>{clue.clue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Down Clues */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 pb-2 border-b border-stone-100 dark:border-stone-800">
              Down Clues
            </h3>
            <div className="space-y-3">
              {board.clues.filter(c => c.direction === 'DOWN').map(clue => (
                <div
                  key={clue.id}
                  onClick={() => setActiveClueId(clue.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeClueId === clue.id 
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-400 text-orange-950 dark:text-orange-100 font-semibold' 
                      : 'border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="font-bold text-orange-600 mr-2">{clue.number}.</span>
                  <span>{clue.clue}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
