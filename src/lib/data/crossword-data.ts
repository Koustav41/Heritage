import { CrosswordClue } from '@/types';

export interface CrosswordBoard {
  title: string;
  difficulty: string;
  gridSize: { rows: number; cols: number };
  clues: CrosswordClue[];
  gridSolution: string[][]; // row x col letter grid
}

export const CANONICAL_CROSSWORD: CrosswordBoard = {
  title: 'West Bengal Heritage & Culture Crossword',
  difficulty: 'Medium',
  gridSize: { rows: 8, cols: 8 },
  gridSolution: [
    ['B', 'A', 'U', 'L', '#', 'D', 'H', 'R'],
    ['A', '#', '#', 'A', '#', 'O', '#', '#'],
    ['L', '#', '#', 'L', '#', 'K', '#', '#'],
    ['U', '#', '#', 'J', '#', 'R', '#', '#'],
    ['C', 'H', 'H', 'A', 'U', 'A', '#', '#'],
    ['H', '#', '#', '#', '#', '#', '#', '#'],
    ['A', '#', '#', '#', '#', '#', '#', '#'],
    ['R', 'O', 'S', 'O', 'G', 'O', 'L', 'A']
  ],
  clues: [
    {
      id: 'c1',
      number: 1,
      direction: 'ACROSS',
      clue: 'Mystic minstrel of Bengal who sings with an ektara in search of the Divine (4 Letters)',
      answer: 'BAUL',
      row: 0,
      col: 0
    },
    {
      id: 'c2',
      number: 2,
      direction: 'ACROSS',
      clue: 'Acronym of the historic UNESCO toy train in the misty mountains of North Bengal (3 Letters)',
      answer: 'DHR',
      row: 0,
      col: 5
    },
    {
      id: 'c3',
      number: 3,
      direction: 'DOWN',
      clue: 'GI-tagged silk sari from Bishnupur with woven scenes of epics in its pallu (9 Letters)',
      answer: 'BALUCHARI',
      row: 0,
      col: 0
    },
    {
      id: 'c4',
      number: 4,
      direction: 'DOWN',
      clue: 'Ancient 4,000-year-old lost-wax bell metal craft practiced in Bikna village (5 Letters)',
      answer: 'DOKRA',
      row: 0,
      col: 5
    },
    {
      id: 'c5',
      number: 5,
      direction: 'ACROSS',
      clue: 'Martial masked dance of Purulia with acrobatic leaps and Charida masks (5 Letters)',
      answer: 'CHHAU',
      row: 4,
      col: 0
    },
    {
      id: 'c6',
      number: 6,
      direction: 'ACROSS',
      clue: 'Spongy white cottage-cheese sweet invented in 1868 by Nobin Chandra Das (9 Letters)',
      answer: 'ROSOGOLA',
      row: 7,
      col: 0
    }
  ]
};
