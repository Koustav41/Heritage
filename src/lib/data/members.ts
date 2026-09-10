import { Guide, Artist, CleanlinessCrew, Researcher, UserRole } from '@/types';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  district: string;
  bio?: string;
  verified: boolean;
  subscriptionActive: boolean;
}

export const DEMO_USERS: Record<UserRole, DemoUser> = {
  VISITOR: {
    id: 'user-visitor-1',
    name: 'Ananya Sen',
    email: 'ananya.sen@example.com',
    phone: '+91 98300 12345',
    role: 'VISITOR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    district: 'Kolkata',
    bio: 'Passionate heritage explorer, photographer, and Bengali literature enthusiast.',
    verified: true,
    subscriptionActive: true
  },
  GUIDE: {
    id: 'user-guide-1',
    name: 'Sourav Gangopadhyay',
    email: 'sourav.heritage@example.com',
    phone: '+91 98311 23456',
    role: 'GUIDE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    district: 'Bankura',
    bio: 'Certified Archaeological Survey of India (ASI) guide specializing in Bishnupur terracotta temples, Malla dynasty history, and Baluchari weavers.',
    verified: true,
    subscriptionActive: true
  },
  WORKSHOP_CONDUCTOR: {
    id: 'user-workshop-1',
    name: 'Shyamal Karmakar',
    email: 'shyamal.dokra@example.com',
    phone: '+91 98322 34567',
    role: 'WORKSHOP_CONDUCTOR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    district: 'Bankura',
    bio: 'National Award-winning Dokra master artisan conducting immersive lost-wax bell metal casting workshops in Bikna village.',
    verified: true,
    subscriptionActive: true
  },
  LOCAL_FOOD_MERCHANT: {
    id: 'user-food-1',
    name: 'Prabir Modak',
    email: 'nobin.sweets@example.com',
    phone: '+91 98333 45678',
    role: 'LOCAL_FOOD_MERCHANT',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    district: 'Kolkata',
    bio: 'Fifth-generation confectioner crafting artisanal melt-in-mouth Nolen Gur Sandesh, Sponge Rosogolla, and Singara.',
    verified: true,
    subscriptionActive: true
  },
  LOCAL_ITEM_SELLER: {
    id: 'user-seller-1',
    name: 'Rupali Das',
    email: 'baluchari.handlooms@example.com',
    phone: '+91 98344 56789',
    role: 'LOCAL_ITEM_SELLER',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    district: 'Bankura',
    bio: 'Weavers guild coordinator promoting authentic GI-certified Bishnupur Baluchari silks, Swarnachari saris, and Dokra jewelry.',
    verified: true,
    subscriptionActive: true
  },
  CLEANLINESS_CREW: {
    id: 'user-clean-1',
    name: 'Bhagirathi Clean Ghats Mission',
    email: 'ghat.cleaners@example.com',
    phone: '+91 98355 67890',
    role: 'CLEANLINESS_CREW',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    district: 'Kolkata',
    bio: 'Community-led green volunteer force dedicated to keeping Hooghly riverbanks, temple courtyards, and heritage zones plastic-free.',
    verified: true,
    subscriptionActive: true
  },
  ARTIST: {
    id: 'user-artist-1',
    name: 'Subhadra Baul & Troupe',
    email: 'subhadra.baul@example.com',
    phone: '+91 98366 78901',
    role: 'ARTIST',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    district: 'Birbhum',
    bio: 'Internationally acclaimed Baul mystic singer and dotara virtuoso hailing from Kenduli, carrying the oral lineage of Lalon Fakir.',
    verified: true,
    subscriptionActive: true
  },
  RESEARCHER: {
    id: 'user-research-1',
    name: 'Dr. Debabrata Roy',
    email: 'dr.roy.heritage@example.com',
    phone: '+91 98377 89012',
    role: 'RESEARCHER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    district: 'Kolkata',
    bio: 'Professor of Archaeology at University of Calcutta specializing in Bengal Sultanate epigraphy, terracotta iconography, and marine trade of Chandraketugarh.',
    verified: true,
    subscriptionActive: true
  },
  ADMIN: {
    id: 'user-admin-1',
    name: 'Parampara Moderator',
    email: 'admin.heritage@wb.gov.in',
    phone: '+91 98000 00001',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    district: 'Kolkata',
    bio: 'Chief System Administrator & Heritage Oversight Board Chair.',
    verified: true,
    subscriptionActive: true
  }
};

export const CANONICAL_GUIDES: Guide[] = [
  {
    id: 'guide-1',
    name: 'Sourav Gangopadhyay',
    district: 'Bankura',
    location: 'Bishnupur Heritage Circuit',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    specialities: ['Malla Dynasty Architecture', 'Terracotta Relief Epics', 'Baluchari Silk Weavers Walk'],
    languages: ['Bengali', 'English', 'Hindi'],
    experienceYears: 12,
    chargePerDay: 1800,
    rating: 4.9,
    reviewsCount: 142,
    bio: 'ASI-certified guide with 12 years walking the ancient terracotta corridors of Rasmancha and Jor Bangla. Special focus on decoding Ramayana plaques and visiting master weaver looms.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98311 23456',
    email: 'sourav.heritage@example.com'
  },
  {
    id: 'guide-2',
    name: 'Pema Tenzing Lepcha',
    district: 'Darjeeling',
    location: 'Darjeeling Hills & Heritage Rail',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    specialities: ['DHR Mountain Steam Train', 'Colonial Tea Estates', 'Himalayan Buddhist Monasteries'],
    languages: ['Nepali', 'Bengali', 'English', 'Tibetan'],
    experienceYears: 9,
    chargePerDay: 2200,
    rating: 4.95,
    reviewsCount: 189,
    bio: 'Third-generation Darjeeling resident passionate about high-altitude steam railway history, heritage British cottages on the Mall, and traditional tea tasting masterclasses.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98388 34567',
    email: 'pema.darjeeling@example.com'
  },
  {
    id: 'guide-3',
    name: 'Arpita Mukherjee',
    district: 'Kolkata',
    location: 'Colonial Calcutta & Renaissance Walk',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    specialities: ['B.B.D. Bagh Colonial Architecture', 'College Street Coffee House Adda', 'Kumartuli Idol Colony'],
    languages: ['Bengali', 'English', 'French'],
    experienceYears: 7,
    chargePerDay: 2000,
    rating: 4.85,
    reviewsCount: 110,
    bio: 'Architectural historian leading heritage walking tours through Dalhousie Square, the Jewish synagogues of Barabazar, and the lanes of Kumartuli during idol sculpting season.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98399 45678',
    email: 'arpita.walks@example.com'
  },
  {
    id: 'guide-4',
    name: 'Kabirul Islam',
    district: 'Murshidabad',
    location: 'Nawabi Murshidabad & Gour Citadel',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    specialities: ['Hazarduari Palace', 'Battle of Plassey Battlefield', 'Adina Mosque & Pandua'],
    languages: ['Bengali', 'Urdu', 'English', 'Hindi'],
    experienceYears: 15,
    chargePerDay: 1900,
    rating: 4.92,
    reviewsCount: 224,
    bio: 'Descendant of court historians, specialized in the Nawabs of Bengal, the Battle of Plassey conspiracies, and medieval Bengal Sultanate ruins in Malda and Pandua.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98301 56789',
    email: 'kabirul.nawab@example.com'
  }
];

export const CANONICAL_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Subhadra Baul & Minstrels',
    bengaliName: 'সুভদ্রা বাউল ও সম্প্রদায়',
    groupType: 'TROUPE',
    category: 'BAUL',
    artForm: 'Acoustic Baul & Fakiri Spirituals',
    district: 'Birbhum',
    location: 'Joydev Kenduli, Birbhum',
    photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    experienceYears: 18,
    performanceCharge: 8500,
    bio: 'Soulful mystic ensemble playing authentic dotara, ektara, khamak, and duggi, performing philosophical songs of Lalon Fakir and Shah Abdul Karim.',
    verified: true,
    portfolioSamples: ['Bhebe Dekh Mon Akela', 'Khachar Vitor Ochin Pakhi', 'Milon Hobe Koto Dine'],
    available: true
  },
  {
    id: 'artist-2',
    name: 'Baghmundi Mahato Chhau Troupe',
    bengaliName: 'বাঘমুন্ডি মাহাতো ছৌ দল',
    groupType: 'TROUPE',
    category: 'CHHAU',
    artForm: 'Acrobatic Masked Martial Dance',
    district: 'Purulia',
    location: 'Baghmundi, Purulia',
    photo: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    experienceYears: 25,
    performanceCharge: 15000,
    bio: '14-member athletic Chhau dance troupe performing the legendary Mahishasura Mardini and Abhimanyu Vadh episodes with handcrafted Charida masks and Dhol-Dhumsa percussion.',
    verified: true,
    portfolioSamples: ['Mahishasura Badh', 'Karna-Arjuna Shongram', 'Durga Vandana'],
    available: true
  },
  {
    id: 'artist-3',
    name: 'Pandit Debashis Bhattacharya',
    bengaliName: 'পণ্ডিত দেবাশিস ভট্টাচার্য',
    groupType: 'SOLO',
    category: 'CLASSICAL_MUSIC',
    artForm: 'Bishnupur Gharana Dhrupad & Vocal',
    district: 'Bankura',
    location: 'Bishnupur',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    experienceYears: 30,
    performanceCharge: 12000,
    bio: 'Doyen of the Bishnupur Gharana—Bengal’s only classical vocal tradition dating back to Tansen’s direct disciple Bahadur Khan in the court of Malla King Raghunath Singha.',
    verified: true,
    portfolioSamples: ['Dhrupad in Raga Bhairav', 'Dhamar in Raga Malkauns'],
    available: true
  }
];

export const CANONICAL_CLEANLINESS_CREWS: CleanlinessCrew[] = [
  {
    id: 'clean-1',
    crewName: 'Bhagirathi Clean Ghats Mission',
    leadCoordinator: 'Subhasish Majumdar',
    membersCount: 45,
    district: 'Kolkata',
    areasServed: ['Prinsep Ghat', 'Babu Ghat', 'Ahiritola Ghat', 'Bagbazar Ghat'],
    photo: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
    description: 'Youth-driven eco-corps that cleans Hooghly river ghats before and after festive immersions, recycling floral waste into compost and incense.',
    cleanupsCompleted: 88,
    wasteDivertedKg: 14200
  },
  {
    id: 'clean-2',
    crewName: 'Bishnupur Temple Heritage Green Force',
    leadCoordinator: 'Tapati Karmakar',
    membersCount: 30,
    district: 'Bankura',
    areasServed: ['Rasmancha Complex', 'Jor Bangla Sanctuary', 'Shyam Rai Enclosure'],
    photo: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    description: 'Locally organized heritage conservators protecting the delicate terracotta monuments from plastic litter and vandalism through weekly clean-ups and pilgrim education.',
    cleanupsCompleted: 52,
    wasteDivertedKg: 6800
  }
];

export const CANONICAL_RESEARCHERS: Researcher[] = [
  {
    id: 'researcher-1',
    name: 'Dr. Debabrata Roy',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    affiliation: 'Department of Archaeology, University of Calcutta',
    education: 'Ph.D. in Ancient Indian History & Epigraphy',
    researchInterests: ['Bengal Sultanate Numismatics', 'Terracotta Relief Iconography', 'Maritime Ports of Chandraketugarh'],
    bio: 'Leading field archaeologist with 20+ peer-reviewed papers on the maritime linkages between ancient Bengal and Southeast Asia.',
    publishedArticles: 24,
    verified: true
  },
  {
    id: 'researcher-2',
    name: 'Dr. Madhushree Ghoshal',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    affiliation: 'Visva-Bharati, Santiniketan',
    education: 'Ph.D. in Ethnomusicology',
    researchInterests: ['Baul Oral Hermeneutics', 'Folk Ballads of Rarh Bengal', 'Tagore Pedagogy in Arts'],
    bio: 'Author of "The Unfettered Minstrel: Voice and Sacred Geographies of Bengal’s Baul Tradition".',
    publishedArticles: 19,
    verified: true
  }
];
