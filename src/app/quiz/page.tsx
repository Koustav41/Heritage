'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  Award, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CANONICAL_QUIZ_QUESTIONS } from '@/lib/data/quiz-data';
import { usePorjotok } from '@/lib/store/porjotok-context';

export default function HeritageQuizPage() {
  const { addPoints, userPoints } = usePorjotok();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);

  const currentQ = CANONICAL_QUIZ_QUESTIONS[currentIdx];

  // Timer
  useEffect(() => {
    if (quizFinished || isAnswered) return;

    if (timeLeft <= 0) {
      handleOptionSelect(-1); // timeout
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, quizFinished]);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswerIndex) {
      setScore(prev => prev + currentQ.points);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < CANONICAL_QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(25);
    } else {
      setQuizFinished(true);
      const earned = score + (selectedOption === currentQ.correctAnswerIndex ? currentQ.points : 0);
      addPoints(earned, 'Completed Bengal Heritage Quiz Master Challenge');
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(25);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Interactive Learning • Earn Real Platform Points</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Bengal Heritage Master Quiz
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Questions curated and fact-checked against verified historical archives of Bengal.
        </p>
      </div>

      {!quizFinished ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
          
          {/* Progress & Stats Bar */}
          <div className="flex items-center justify-between text-xs font-bold pb-4 border-b border-stone-100 dark:border-stone-800">
            <span className="text-stone-500">
              Question {currentIdx + 1} of {CANONICAL_QUIZ_QUESTIONS.length}
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
                <span>Score: {score} pts</span>
              </div>

              <div className={`flex items-center gap-1 font-mono px-2 py-0.5 rounded-md ${
                timeLeft < 8 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              {currentQ.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;

              let btnStyle = 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-400';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                } else {
                  btnStyle = 'bg-stone-100 dark:bg-stone-800/40 text-stone-400 border-transparent opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </span>

                  {isAnswered && (
                    <span>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Button */}
          {isAnswered && (
            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs text-stone-700 dark:text-stone-300">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">Archive Fact Grounding:</span>
                {currentQ.explanation}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
              >
                <span>{currentIdx + 1 < CANONICAL_QUIZ_QUESTIONS.length ? 'Next Question' : 'Finish Quiz & Claim Points'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full gradient-terracotta text-white flex items-center justify-center mx-auto shadow-xl">
            <Award className="w-10 h-10 text-amber-200" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-stone-900 dark:text-stone-100">
              Quiz Completed!
            </h2>
            <p className="text-sm text-stone-500">
              You scored <span className="font-bold text-amber-600 text-base">{score}</span> out of {CANONICAL_QUIZ_QUESTIONS.length * 20} points.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 text-xs font-semibold inline-block">
            🪙 +{score} Heritage Points have been deposited into your Porjotok profile wallet!
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            <Link
              href="/crosswords"
              className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Try Cultural Crossword</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
