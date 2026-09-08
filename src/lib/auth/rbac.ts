import { UserRole } from '@/types';

export type Permission = 
  | 'ACCESS_ADMIN_PORTAL'
  | 'MODERATE_VERIFICATIONS'
  | 'MODERATE_FUNDRAISERS'
  | 'RESOLVE_COMPLAINTS'
  | 'VIEW_AUDIT_LOGS'
  | 'SUBMIT_REVIEWS'
  | 'BOOK_SERVICES'
  | 'CREATE_ORDERS'
  | 'SUBMIT_FUNDRAISER'
  | 'MANAGE_MERCHANT_ORDERS'
  | 'MANAGE_GUIDE_TOURS'
  | 'MANAGE_WORKSHOP_SESSIONS'
  | 'MANAGE_CRAFT_CATALOG'
  | 'MANAGE_ARTIST_BOOKINGS'
  | 'MANAGE_CLEANLINESS_CAMPAIGNS'
  | 'MANAGE_RESEARCH_CONTRIBUTIONS';

export const ADMIN_SECURITY_KEY = 'SIH-26197-ADMIN';

/**
 * Role-Based Access Control matrix mapping roles to authorized permissions.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'ACCESS_ADMIN_PORTAL',
    'MODERATE_VERIFICATIONS',
    'MODERATE_FUNDRAISERS',
    'RESOLVE_COMPLAINTS',
    'VIEW_AUDIT_LOGS',
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'SUBMIT_FUNDRAISER',
    'MANAGE_MERCHANT_ORDERS',
    'MANAGE_GUIDE_TOURS',
    'MANAGE_WORKSHOP_SESSIONS',
    'MANAGE_CRAFT_CATALOG',
    'MANAGE_ARTIST_BOOKINGS',
    'MANAGE_CLEANLINESS_CAMPAIGNS',
    'MANAGE_RESEARCH_CONTRIBUTIONS'
  ],
  VISITOR: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS'
  ],
  GUIDE: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'MANAGE_GUIDE_TOURS'
  ],
  WORKSHOP_CONDUCTOR: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'MANAGE_WORKSHOP_SESSIONS'
  ],
  LOCAL_FOOD_MERCHANT: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'MANAGE_MERCHANT_ORDERS'
  ],
  LOCAL_ITEM_SELLER: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'MANAGE_CRAFT_CATALOG'
  ],
  CLEANLINESS_CREW: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'SUBMIT_FUNDRAISER',
    'MANAGE_CLEANLINESS_CAMPAIGNS'
  ],
  ARTIST: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'MANAGE_ARTIST_BOOKINGS'
  ],
  RESEARCHER: [
    'SUBMIT_REVIEWS',
    'BOOK_SERVICES',
    'CREATE_ORDERS',
    'MANAGE_RESEARCH_CONTRIBUTIONS'
  ]
};

/**
 * Checks if a given role has a specific permission.
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return Boolean(ROLE_PERMISSIONS[role]?.includes(permission));
}

/**
 * Checks if a given role has administrator privileges.
 */
export function isAdmin(role?: UserRole): boolean {
  return role === 'ADMIN';
}

/**
 * Validates whether the provided security key matches the authorized Admin Passkey.
 */
export function validateAdminPasskey(passkey: string): boolean {
  if (!passkey) return false;
  return passkey.trim().toUpperCase() === ADMIN_SECURITY_KEY;
}

/**
 * Checks whether an authenticated user can access the profile controls of a target role/portal.
 * Rules:
 * - A VISITOR can ONLY access VISITOR controls (never provider or admin controls).
 * - A Provider can access their own role and VISITOR controls (as a traveler), but NOT other providers' controls.
 * - An ADMIN can access all portals for oversight and moderation.
 */
export function canAccessProfileControls(userRole: UserRole, targetPortal: UserRole): boolean {
  // Visitor traveler portal is accessible to all users for personal bookings/orders
  if (targetPortal === 'VISITOR') {
    return true;
  }
  // Admin has omniscient administrative oversight
  if (userRole === 'ADMIN') {
    return true;
  }
  // Otherwise, user role must strictly match the target portal
  return userRole === targetPortal;
}

/**
 * Human-readable metadata for each role's access boundary and credentials.
 */
export const ROLE_GATE_METADATA: Record<UserRole, {
  title: string;
  category: string;
  description: string;
  credentialDoc: string;
}> = {
  VISITOR: {
    title: 'Traveler / Visitor Profile',
    category: 'General Public',
    description: 'Personal travel itinerary, bookings, sweet orders, and verified workshop certificates.',
    credentialDoc: 'Public Account'
  },
  GUIDE: {
    title: 'ASI Certified Guide Portal',
    category: 'Verified Provider',
    description: 'Assigned heritage circuit tours, client schedules, and private tour revenue statistics.',
    credentialDoc: 'Ministry of Tourism / ASI License'
  },
  WORKSHOP_CONDUCTOR: {
    title: 'Workshop Master Conductor Console',
    category: 'Verified Provider',
    description: 'Masterclass schedule management, student enrollments, and QR certificate generation.',
    credentialDoc: 'National/State Master Artisan Guild Accreditation'
  },
  LOCAL_FOOD_MERCHANT: {
    title: 'Artisanal Food Merchant Console',
    category: 'Verified Merchant',
    description: 'Incoming customer orders, live preparation pipeline, and order fulfillment controls.',
    credentialDoc: 'FSSAI License & Trade Registration'
  },
  LOCAL_ITEM_SELLER: {
    title: 'Handloom & Craft Guild Seller Console',
    category: 'Verified Merchant',
    description: 'GI craft inventory management, dispatch log, and customer orders fulfillment.',
    credentialDoc: 'Weavers Cooperative / Export Guild Proof'
  },
  CLEANLINESS_CREW: {
    title: 'Cleanliness Crew Coordinator Console',
    category: 'Community Coordinator',
    description: 'Ghat and temple cleanup dispatch, volunteer management, and civic fundraiser campaigns.',
    credentialDoc: 'Green Volunteer Society Registration & Civic Clearance'
  },
  ARTIST: {
    title: 'Folk Artist & Performer Console',
    category: 'Traditional Performer',
    description: 'Performance booking contracts, cultural festival dates, and troupe repertoire management.',
    credentialDoc: 'Sangeet Natak Akademi / Folk Artiste Card'
  },
  RESEARCHER: {
    title: 'Heritage Academic & Researcher Console',
    category: 'Academic Scholar',
    description: 'Unpublished field research manuscripts, monograph submissions, and epigraphy logs.',
    credentialDoc: 'University / Institutional Affiliation ID'
  },
  ADMIN: {
    title: 'State Heritage Administrator Console',
    category: 'System Administration',
    description: 'Ecosystem governance, provider vetting, campaign moderation, complaints, and audit trails.',
    credentialDoc: 'Govt. WB Heritage Board Key'
  }
};
