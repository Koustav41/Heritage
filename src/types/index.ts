export type SiteCategory = 
  | 'MONUMENT' 
  | 'RELIGIOUS_SITE' 
  | 'COLONIAL_HERITAGE' 
  | 'NATURAL_HERITAGE' 
  | 'ARCHITECTURE' 
  | 'HISTORICAL_PERSONALITY' 
  | 'OTHER';

export type CultureCategory = 
  | 'FESTIVAL' 
  | 'RELIGIOUS_TRADITION' 
  | 'FAIR' 
  | 'CULTURAL_EVENT' 
  | 'MUSIC' 
  | 'DANCE' 
  | 'THEATRE_PERFORMANCE' 
  | 'LITERATURE' 
  | 'PAINTING' 
  | 'CRAFT' 
  | 'METALWORK' 
  | 'TEXTILE' 
  | 'WEAVING' 
  | 'FOLK_TRADITION' 
  | 'RITUAL' 
  | 'FOOD_CULTURE' 
  | 'OTHER';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HeritageSite {
  id: string;
  name: string;
  bengaliName?: string;
  nativeName?: string;
  slug: string;
  shortDescription: string;
  detailedHistory: string;
  culturalSignificance: string;
  architecturalSignificance: string;
  historicalPeriod: string;
  constructionPeriod: string;
  state: string;
  district: string;
  address: string;
  coordinates: Coordinates;
  siteType: SiteCategory;
  historicalPersonalities: string[];
  associatedCultures: string[];
  visitingHours: string;
  entryFee: string;
  accessibilityInfo: string;
  nearbySites: string[];
  featuredImage: string;
  gallery: string[];
  audioStory?: string;
  verified: boolean;
  featured?: boolean;
}

export interface CultureEntry {
  id: string;
  name: string;
  bengaliName?: string;
  nativeName?: string;
  state: string;
  slug: string;
  category: CultureCategory;
  shortDescription: string;
  detailedExplanation: string;
  originHistory: string;
  geographicAssociation: string;
  practitioners: string;
  culturalSignificance: string;
  historicalPeriod: string;
  connectedEvents: string[];
  relatedSites: string[];
  featuredImage: string;
  gallery: string[];
  verified: boolean;
  featured?: boolean;
}

export interface Guide {
  id: string;
  name: string;
  state: string;
  district: string;
  location: string;
  photo: string;
  specialities: string[];
  languages: string[];
  experienceYears: number;
  chargePerDay: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  verified: boolean;
  subscriptionActive: boolean;
  available: boolean;
  phone: string;
  email: string;
}

export interface Workshop {
  id: string;
  title: string;
  slug: string;
  category: string;
  instructorName: string;
  instructorBio: string;
  instructorPhoto: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  state: string;
  district: string;
  capacity: number;
  enrolledCount: number;
  price: number;
  goodieIncluded: boolean;
  certificateIncluded: boolean;
  description: string;
  image: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
}

export interface FoodItem {
  id: string;
  name: string;
  bengaliName?: string;
  nativeName?: string;
  slug?: string;
  category: 'SWEET' | 'STREET_FOOD' | 'TRADITIONAL_MEAL' | 'SNACK' | 'BEVERAGE';
  price: number;
  description: string;
  merchantName: string;
  merchantLocation: string;
  state: string;
  district: string;
  merchantRating: number;
  openingHours: string;
  images: string[];
  isVegetarian: boolean;
  verifiedMerchant: boolean;
  available: boolean;
}

export interface LocalProduct {
  id: string;
  name: string;
  bengaliName?: string;
  nativeName?: string;
  category: 'TEXTILE' | 'CRAFT' | 'PAINTING' | 'POTTERY' | 'FOOD_PRODUCT' | 'SOUVENIR';
  price: number;
  stock: number;
  description: string;
  sellerName: string;
  sellerLocation: string;
  state: string;
  district: string;
  sellerRating: number;
  craftHeritage: string;
  images: string[];
  verifiedSeller: boolean;
  available: boolean;
}

export interface Artist {
  id: string;
  name: string;
  bengaliName?: string;
  groupType: 'SOLO' | 'TROUPE';
  category: 'BAUL' | 'CHHAU' | 'JATRA' | 'RABINDRA_SANGEET' | 'FOLK_DANCE' | 'CLASSICAL_MUSIC';
  artForm: string;
  district: string;
  location: string;
  photo: string;
  experienceYears: number;
  performanceCharge: number;
  bio: string;
  verified: boolean;
  portfolioSamples: string[];
  available: boolean;
}

export interface CleanlinessCrew {
  id: string;
  crewName: string;
  leadCoordinator: string;
  membersCount: number;
  district: string;
  areasServed: string[];
  photo: string;
  description: string;
  cleanupsCompleted: number;
  wasteDivertedKg: number;
}

export interface Fundraiser {
  id: string;
  title: string;
  crewName: string;
  district: string;
  state?: string;
  location: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  purpose: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'ACTIVE' | 'COMPLETED' | 'REJECTED';
}

export interface Researcher {
  id: string;
  name: string;
  photo: string;
  affiliation: string;
  education: string;
  researchInterests: string[];
  bio: string;
  publishedArticles: number;
  verified: boolean;
}

export interface HistoricalMilestone {
  id: string;
  era: 'ANCIENT' | 'MEDIEVAL' | 'NAWABI' | 'COLONIAL_RENAISSANCE' | 'FREEDOM_STRUGGLE' | 'CONTEMPORARY';
  yearRange: string;
  title: string;
  shortSummary: string;
  detailedHistory: string;
  majorPersonalities: string[];
  relatedSites: string[];
  image: string;
}

export interface PhotoArchiveItem {
  id: string;
  title: string;
  description: string;
  photographer: string;
  district: string;
  relatedSiteOrCulture: string;
  eraOrYear: string;
  imageUrl: string;
  tags: string[];
  likesCount: number;
}

export interface VideoArchiveItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  district: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploader: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: string;
  points: number;
}

export interface CrosswordClue {
  id: string;
  number: number;
  direction: 'ACROSS' | 'DOWN';
  clue: string;
  answer: string;
  row: number;
  col: number;
}

export type UserRole = 
  | 'VISITOR' 
  | 'GUIDE' 
  | 'WORKSHOP_CONDUCTOR' 
  | 'LOCAL_ITEM_SELLER' 
  | 'LOCAL_FOOD_MERCHANT' 
  | 'CLEANLINESS_CREW' 
  | 'ARTIST' 
  | 'RESEARCHER' 
  | 'ADMIN';

export interface Booking {
  id: string;
  serviceType: 'GUIDE' | 'WORKSHOP' | 'ARTIST';
  itemTitle: string;
  providerName: string;
  date: string;
  time?: string;
  guestsCount: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
  bookingDate: string;
}

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  itemType: 'FOOD' | 'PRODUCT';
}

export interface Order {
  id: string;
  customerName: string;
  merchantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  orderDate: string;
  deliveryAddress: string;
}

export interface VerificationRequest {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  category: UserRole;
  district: string;
  appliedDate: string;
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  documentType: string;
  verificationNotes?: string;
}

export interface Complaint {
  id: string;
  complainantName: string;
  category: string;
  subject: string;
  description: string;
  relatedService: string;
  status: 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';
  filedDate: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityName: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
}
