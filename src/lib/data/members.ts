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
    avatar: 'https://images.unsplash.com/photo-1519764622345-23439dd774f7?auto=format&fit=crop&w=400&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    district: 'Kolkata',
    bio: 'Chief System Administrator & Heritage Oversight Board Chair.',
    verified: true,
    subscriptionActive: true
  }
};

const WEST_BENGAL_GUIDES: Omit<Guide, 'state'>[] = [
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
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
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
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
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
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&q=80',
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

export const PAN_INDIA_GUIDES: Guide[] = [
  // Rajasthan
  {
    id: 'guide-raj-1',
    name: 'Vikramaditya Singh Rathore',
    state: 'Rajasthan',
    district: 'Jaipur',
    location: 'Jaipur & Amer Fort Heritage Circuit',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    specialities: ['Amer Fort Secret Tunnels', 'Sheesh Mahal Mirror Optics', 'Jantar Mantar Astronomical Science'],
    languages: ['Hindi', 'English', 'Rajasthani', 'French'],
    experienceYears: 14,
    chargePerDay: 2400,
    rating: 4.97,
    reviewsCount: 312,
    bio: 'Ministry of Tourism certified senior guide with over 14 years narrating the royal sagas of Kachwaha Rajput rulers, hidden underground water systems of Jaigarh, and the Pink City architectural layout.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98290 11223',
    email: 'vikram.jaipur@heritage-guide.in'
  },
  {
    id: 'guide-raj-2',
    name: 'Gajendra Singh Shekhawat',
    state: 'Rajasthan',
    district: 'Jodhpur',
    location: 'Jodhpur Blue City & Mehrangarh Fort',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    specialities: ['Mehrangarh Ramparts & Armoury', 'Brahmapuri Blue City Walking Tours', 'Bishnoi Village Eco-Culture'],
    languages: ['Hindi', 'English', 'Marwari', 'German'],
    experienceYears: 11,
    chargePerDay: 2100,
    rating: 4.93,
    reviewsCount: 198,
    bio: 'Jodhpur native and folklorist guiding travelers through the labyrinthine blue alleys beneath Mehrangarh, deciphering cenotaph inscriptions at Jaswant Thada and desert tribal lifestyles.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98291 22334',
    email: 'gajendra.jodhpur@heritage-guide.in'
  },

  // Uttar Pradesh
  {
    id: 'guide-up-1',
    name: 'Dr. Tariq Ahmad Khan',
    state: 'Uttar Pradesh',
    district: 'Agra',
    location: 'Agra Imperial Mughal Triangle (Taj & Fort)',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    specialities: ['Taj Mahal Pietra Dura Inlay Lore', 'Mughal Persian Epigraphy', 'Fatehpur Sikri Sufi Philosophy'],
    languages: ['Hindi', 'Urdu', 'English', 'Persian', 'Spanish'],
    experienceYears: 18,
    chargePerDay: 2500,
    rating: 4.98,
    reviewsCount: 460,
    bio: 'ASI Gold-Badge Historian and PhD in Mughal Studies. Specialist in Shah Jahani architectural geometry, decoding Quranic calligraphy bands on the Taj Mahal, and Akbar’s syncretic court at Fatehpur Sikri.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98370 33445',
    email: 'dr.tariq.agra@heritage-guide.in'
  },
  {
    id: 'guide-up-2',
    name: 'Pt. Devavrat Shastri',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    location: 'Varanasi Ancient Ghats & Sacred Kashi',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    specialities: ['Dawn Boat Ghat Explanations', 'Kashi Vishwanath Corridor History', 'Kabir & Tulsidas Sacred Trails'],
    languages: ['Hindi', 'Sanskrit', 'English', 'Bengali'],
    experienceYears: 16,
    chargePerDay: 2000,
    rating: 4.96,
    reviewsCount: 380,
    bio: 'Banaras Hindu University alumnus leading soul-stirring dawn boat walks from Assi to Manikarnika Ghat, illuminating centuries of Vedic philosophy, silk weaving lanes, and evening sandhya aarti rituals.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98390 44556',
    email: 'devavrat.kashi@heritage-guide.in'
  },

  // Karnataka
  {
    id: 'guide-kar-1',
    name: 'Basavaraj Hampi Gowda',
    state: 'Karnataka',
    district: 'Vijayanagara',
    location: 'Hampi Vijayanagara Empire Archaeological Circuit',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    specialities: ['Vittala Temple Musical Pillar Acoustic Tests', 'Vijayanagara Stone Chariot Geometry', 'Tungabhadra Coracle & Mythological Trails'],
    languages: ['Kannada', 'English', 'Hindi', 'Telugu'],
    experienceYears: 13,
    chargePerDay: 2200,
    rating: 4.95,
    reviewsCount: 265,
    bio: 'Archaeology graduate born in Hampi village. Renowned for demonstrating the acoustic swaras of the musical stone pillars and narrating the glorious era of Emperor Krishnadevaraya.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98450 55667',
    email: 'basavaraj.hampi@heritage-guide.in'
  },
  {
    id: 'guide-kar-2',
    name: 'Chandrashekhar Murthy',
    state: 'Karnataka',
    district: 'Mysuru',
    location: 'Mysuru Royal Heritage & Srirangapatna',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    specialities: ['Mysore Palace Indo-Saracenic Art', 'Wadiyar Royal Dynasty Chronicles', 'Tipu Sultan Summer Palace Trails'],
    languages: ['Kannada', 'English', 'Hindi', 'Tamil'],
    experienceYears: 10,
    chargePerDay: 1900,
    rating: 4.91,
    reviewsCount: 175,
    bio: 'Heritage walk specialist covering the royal legacy of the Wadiyars, the private residential wings of Amba Vilas, and the Anglo-Mysore battlefield fortifications at Srirangapatna.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98451 66778',
    email: 'murthy.mysore@heritage-guide.in'
  },

  // Tamil Nadu
  {
    id: 'guide-tn-1',
    name: 'Dr. K. Swaminathan',
    state: 'Tamil Nadu',
    district: 'Thanjavur',
    location: 'Thanjavur & Great Living Chola Temples',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    specialities: ['Brihadisvara Granite Vimana Engineering', 'Chola Bronze Casting Technique', 'Tamil Epigraphy & Inscriptions'],
    languages: ['Tamil', 'English', 'French', 'Hindi'],
    experienceYears: 15,
    chargePerDay: 2300,
    rating: 4.98,
    reviewsCount: 340,
    bio: 'Epigraphist and temple historian with 15 years deciphering the 11th-century Tamil inscriptions on the walls of Big Temple. Organizes heritage walks to bronze casting villages in Swamimalai.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98400 77889',
    email: 'swaminathan.chola@heritage-guide.in'
  },
  {
    id: 'guide-tn-2',
    name: 'Meenakshi Sundaresan',
    state: 'Tamil Nadu',
    district: 'Madurai',
    location: 'Madurai Living Heritage & Ancient Sangam Walk',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    specialities: ['Meenakshi Temple 14 Gopuram Iconography', 'Hall of Thousand Pillars Secrets', 'Nayaka Dynastic Palaces'],
    languages: ['Tamil', 'English', 'Hindi'],
    experienceYears: 9,
    chargePerDay: 1800,
    rating: 4.92,
    reviewsCount: 160,
    bio: 'Storyteller and licensed temple guide weaving mythological tales and historical events that shaped 2,500 years of unbroken living tradition in Madurai.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98401 88990',
    email: 'meenakshi.madurai@heritage-guide.in'
  },

  // Maharashtra
  {
    id: 'guide-mah-1',
    name: 'Anuradha Deshmukh',
    state: 'Maharashtra',
    district: 'Chhatrapati Sambhajinagar',
    location: 'Ajanta & Ellora Rock-Cut Caves Circuit',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    specialities: ['Kailasa Monolithic Excavation Geometry', 'Ajanta Padmapani Buddhist Frescoes', 'Jain & Buddhist Monastic Cave Art'],
    languages: ['Marathi', 'Hindi', 'English', 'German'],
    experienceYears: 12,
    chargePerDay: 2400,
    rating: 4.96,
    reviewsCount: 290,
    bio: 'Art historian accredited by Maharashtra Tourism. Deep expertise in tracing the evolution of rock-cut architecture across 34 Ellora caves and explaining the natural mineral pigments of Ajanta.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98220 99001',
    email: 'anuradha.ellora@heritage-guide.in'
  },
  {
    id: 'guide-mah-2',
    name: 'Jehangir Batliwala',
    state: 'Maharashtra',
    district: 'Mumbai City',
    location: 'South Mumbai Victorian Gothic & Art Deco Walk',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    specialities: ['CSMT Victorian Gothic Gargoyles', 'Gateway of India & Apollo Bunder Lore', 'Marine Drive Art Deco Heritage'],
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    experienceYears: 10,
    chargePerDay: 2200,
    rating: 4.9,
    reviewsCount: 210,
    bio: 'Architectural conservator and Mumbai heritage conservation trust member. Leads insightful walking tours from Fort to Kala Ghoda exploring colonial archives and Bombay merchant history.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98221 00112',
    email: 'jehangir.mumbai@heritage-guide.in'
  },

  // Delhi
  {
    id: 'guide-del-1',
    name: 'Salma Qureshi',
    state: 'Delhi',
    district: 'Central Delhi',
    location: 'Old Delhi Shahjahanabad & Red Fort Circuit',
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80',
    specialities: ['Red Fort Diwan-i-Khas Secrets', 'Chandni Chowk Havelis & Culinary Heritage', 'Dastangoi Oral Storytelling Walks'],
    languages: ['Hindi', 'Urdu', 'English'],
    experienceYears: 8,
    chargePerDay: 2100,
    rating: 4.94,
    reviewsCount: 195,
    bio: 'Seventh-generation Old Delhi resident. Combines classical Urdu poetry, architectural analysis of Shahjahanabad, and immersive food walks through centuries-old spice and sweet lanes.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98110 12345',
    email: 'salma.delhi@heritage-guide.in'
  },

  // Punjab
  {
    id: 'guide-pun-1',
    name: 'Sardar Harpreet Singh',
    state: 'Punjab',
    district: 'Amritsar',
    location: 'Amritsar Heritage & Golden Temple Circuit',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    specialities: ['Harmandir Sahib Spiritual Architecture', 'Partition Museum Historical Footsteps', 'Jallianwala Bagh Memorial Narratives'],
    languages: ['Punjabi', 'Hindi', 'English'],
    experienceYears: 11,
    chargePerDay: 1900,
    rating: 4.97,
    reviewsCount: 280,
    bio: 'Registered Punjab Tourism guide dedicated to sharing the living spirit of Seva and universal brotherhood at the Golden Temple, alongside poignant historical narratives of the Partition.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98140 23456',
    email: 'harpreet.amritsar@heritage-guide.in'
  },

  // Odisha
  {
    id: 'guide-odi-1',
    name: 'Subrat Kumar Mohanty',
    state: 'Odisha',
    district: 'Puri',
    location: 'Konark Sun Temple & Puri Heritage Circuit',
    photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=600&q=80',
    specialities: ['Konark Chariot Wheel Sundial Reading', 'Kalinga Temple Architecture', 'Puri Ratha Yatra & Pattachitra Villages'],
    languages: ['Odia', 'Hindi', 'English', 'Bengali'],
    experienceYears: 13,
    chargePerDay: 2000,
    rating: 4.95,
    reviewsCount: 240,
    bio: 'Expert on Kalinga art and architecture. Famous for demonstrating how to read exact local solar time using the shadow spokes of the monumental Konark Sun Temple chariot wheels.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98610 34567',
    email: 'subrat.konark@heritage-guide.in'
  },

  // Madhya Pradesh
  {
    id: 'guide-mp-1',
    name: 'Raghvendra Bundela',
    state: 'Madhya Pradesh',
    district: 'Chhatarpur',
    location: 'Khajuraho Temples & Bundelkhand Circuit',
    photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80',
    specialities: ['Kandariya Mahadeva Iconography', 'Chandela Rajput Dynastic History', 'Medieval Tantric Art Philosophy'],
    languages: ['Hindi', 'English', 'Spanish', 'French'],
    experienceYears: 14,
    chargePerDay: 2200,
    rating: 4.96,
    reviewsCount: 310,
    bio: 'Born in Khajuraho and trained with the Archaeological Survey of India. Guides international delegations through the western and eastern temple clusters with deep philosophical context.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98260 45678',
    email: 'raghvendra.khajuraho@heritage-guide.in'
  },

  // Bihar
  {
    id: 'guide-bih-1',
    name: 'Prof. Anand Kumar Sinha',
    state: 'Bihar',
    district: 'Gaya',
    location: 'Bodh Gaya Mahabodhi & Nalanda University Ruins',
    photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80',
    specialities: ['Mahabodhi Temple Enlightenment Sacred Spots', 'Nalanda Ancient Monastic University Architecture', 'Emperor Ashoka Pillar Edicts'],
    languages: ['Hindi', 'English', 'Pali', 'Japanese'],
    experienceYears: 20,
    chargePerDay: 2500,
    rating: 4.99,
    reviewsCount: 420,
    bio: 'Retired Professor of Ancient Indian History. Has guided Buddhist delegations, historians, and travelers from around the world across the sacred Bodh Gaya and Nalanda university excavations.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98350 56789',
    email: 'prof.anand.bodhgaya@heritage-guide.in'
  },

  // Kerala
  {
    id: 'guide-ker-1',
    name: 'Kurian Joseph',
    state: 'Kerala',
    district: 'Ernakulam',
    location: 'Fort Kochi & Spice Route Maritime Circuit',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
    specialities: ['Mattancherry Dutch Palace Ramayana Murals', 'Jew Town & Paradesi Synagogue Lore', 'Chinese Fishing Net Operation'],
    languages: ['Malayalam', 'English', 'Portuguese', 'Hindi'],
    experienceYears: 11,
    chargePerDay: 2100,
    rating: 4.93,
    reviewsCount: 220,
    bio: 'Heritage enthusiast living in Fort Kochi. Guides walking tours through colonial spice godowns, Portuguese churches, Dutch palaces, and the centuries-old Cochin Jewish quarter.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98470 67890',
    email: 'kurian.kochi@heritage-guide.in'
  },

  // Assam
  {
    id: 'guide-asm-1',
    name: 'Nilutpal Saikia',
    state: 'Assam',
    district: 'Golaghat',
    location: 'Kaziranga National Park & Brahmaputra Valley',
    photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80',
    specialities: ['Kaziranga Wildlife Safari Tracking', 'Ahom Dynasty Monuments of Sibsagar', 'Assam Tea Garden & Mishing Village Walks'],
    languages: ['Assamese', 'English', 'Hindi', 'Bengali'],
    experienceYears: 10,
    chargePerDay: 2000,
    rating: 4.94,
    reviewsCount: 185,
    bio: 'Wildlife naturalist and Ahom heritage guide. Leads thrilling jeep safaris through Kaziranga’s central and western ranges, while sharing the history of the legendary 600-year Ahom kingdom.',
    verified: true,
    subscriptionActive: true,
    available: true,
    phone: '+91 98640 78901',
    email: 'nilutpal.kaziranga@heritage-guide.in'
  }
];

export const CANONICAL_GUIDES: Guide[] = [
  ...WEST_BENGAL_GUIDES.map(g => ({ ...g, state: 'West Bengal' })),
  ...PAN_INDIA_GUIDES
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
