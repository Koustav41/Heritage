import { QuizQuestion } from '@/types';

export const CANONICAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'In which year was Durga Puja of Kolkata inscribed on UNESCO’s Representative List of Intangible Cultural Heritage of Humanity?',
    options: ['2015', '2019', '2021', '2023'],
    correctAnswerIndex: 2,
    explanation: 'Durga Puja in Kolkata was formally inscribed on the UNESCO Intangible Cultural Heritage list in December 2021.',
    category: 'Festivals & Culture',
    points: 20
  },
  {
    id: 'quiz-2',
    question: 'Which Malla king built the world-renowned stepped-pyramid terracotta monument "Rasmancha" in Bishnupur in 1600 CE?',
    options: ['King Bir Hambir', 'King Raghunath Singha', 'King Durjan Singha Dev', 'King Chaitanya Singha'],
    correctAnswerIndex: 0,
    explanation: 'King Bir Hambir commissioned Rasmancha in 1600 CE to convene the Radha-Krishna deities of all kingdom shrines during the annual Ras festival.',
    category: 'Architecture',
    points: 20
  },
  {
    id: 'quiz-3',
    question: 'What is the primary natural casting technique used by traditional Dokra artisans in Bikna and Dariyapur?',
    options: ['Sand Casting', 'Lost-Wax (Cire Perdue) Bell Metal Casting', 'Die Casting', 'Centrifugal Plaster Molding'],
    correctAnswerIndex: 1,
    explanation: 'Dokra is one of the earliest known lost-wax (cire perdue) metallurgical crafts in human history, dating back over 4,000 years to Mohenjo-daro.',
    category: 'Crafts & Metalwork',
    points: 20
  },
  {
    id: 'quiz-4',
    question: 'From which historic Kolkata residence did Netaji Subhas Chandra Bose undertake his daring "Great Escape" in January 1941?',
    options: ['Jorasanko Thakurbari', 'Netaji Bhawan on Elgin Road', 'Sabarna Roy Choudhury Mansion', 'Raja Ram Mohan Roy Memorial'],
    correctAnswerIndex: 1,
    explanation: 'Netaji departed secretly from Netaji Bhawan (38/2 Elgin Road) past British surveillance disguised as Muhammad Ziauddin in a Wanderer car.',
    category: 'Freedom Struggle',
    points: 20
  },
  {
    id: 'quiz-5',
    question: 'Which sweetmaker of Bagbazar is celebrated as the inventor of the spongy "Banglar Rosogolla" in 1868?',
    options: ['K.C. Das', 'Nobin Chandra Das', 'Bhim Chandra Nag', 'Girish Chandra Dey'],
    correctAnswerIndex: 1,
    explanation: 'Nobin Chandra Das successfully boiled kneaded cow milk chhana balls in rolling light syrup in 1868, creating the iconic sponge Rosogolla.',
    category: 'Culinary Heritage',
    points: 20
  },
  {
    id: 'quiz-6',
    question: 'The Darjeeling Himalayan Railway, opened in 1881, is famous for which unique mountain engineering curve feature?',
    options: ['The Batasia Loop', 'The Rohtang Tunnel', 'The Pamban Viaduct', 'The Dudhsagar Horseshoe'],
    correctAnswerIndex: 0,
    explanation: 'Batasia Loop allows the narrow-gauge steam engine to uncoil 1,000 feet of altitude in a gentle gradient with panoramic views of Kanchenjunga.',
    category: 'Colonial Heritage',
    points: 20
  },
  {
    id: 'quiz-7',
    question: 'In Bengal Patachitra tradition, what is the musical ballad sung by the painter while unrolling the scroll called?',
    options: ['Baul Gaan', 'Pater Gaan', 'Bhatiyali', 'Jhumur'],
    correctAnswerIndex: 1,
    explanation: 'Patuas or Chitrakars sing "Pater Gaan", melodious oral poetry describing the narrative depicted on each framed segment of the scroll.',
    category: 'Folk Traditions',
    points: 20
  },
  {
    id: 'quiz-8',
    question: 'What is the name of the white spongy reed core carved into wedding topors and Durga ornaments (daaker saaj)?',
    options: ['Jute Pith', 'Sholapith (Aeschynomene aspera)', 'Bamboo Spore', 'Cane Rind'],
    correctAnswerIndex: 1,
    explanation: 'Sholapith is extracted from the dried stem of the herbaceous aquatic marsh plant Shola, carved into featherweight white adornments.',
    category: 'Crafts',
    points: 20
  }
];
