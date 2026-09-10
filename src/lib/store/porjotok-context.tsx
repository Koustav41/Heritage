'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Booking, 
  Order, 
  OrderItem, 
  VerificationRequest, 
  Complaint, 
  AuditLog,
  Fundraiser
} from '@/types';
import { DEMO_USERS, DemoUser } from '@/lib/data/members';
import { CANONICAL_FUNDRAISERS } from '@/lib/data/fundraisers';
import { validateAdminPasskey } from '@/lib/auth/rbac';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'FOOD' | 'PRODUCT';
  merchantOrSeller: string;
  image: string;
}

interface PorjotokContextType {
  // Authentication & Role
  isLoggedIn: boolean;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: DemoUser;
  login: (email: string, password?: string, role?: UserRole, customName?: string) => boolean;
  logout: () => void;
  registerUser: (data: { name: string; email: string; phone?: string; role: UserRole; district?: string }) => void;
  elevateToAdmin: (passkey: string) => { success: boolean; message: string };
  revokeAdminRole: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => string;
  cancelBooking: (id: string) => void;
  
  // Orders
  orders: Order[];
  placeOrder: (deliveryAddress: string) => string;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  
  // Verifications (Admin)
  verifications: VerificationRequest[];
  approveVerification: (id: string) => void;
  rejectVerification: (id: string) => void;
  
  // Fundraisers
  fundraisers: Fundraiser[];
  approveFundraiser: (id: string) => void;
  rejectFundraiser: (id: string) => void;
  donateToFundraiser: (fundraiserId: string, amount: number) => void;
  
  // Gamification & Rewards
  userPoints: number;
  addPoints: (pts: number, reason: string) => void;
  savedSiteSlugs: string[];
  toggleSaveSite: (slug: string) => void;
  
  // Complaints
  complaints: Complaint[];
  fileComplaint: (comp: Omit<Complaint, 'id' | 'filedDate' | 'status'>) => void;
  resolveComplaint: (id: string) => void;
  
  // Audit Logs
  auditLogs: AuditLog[];
  logAction: (action: string, entityType: string, entityName: string, status?: AuditLog['status']) => void;
}

const PorjotokContext = createContext<PorjotokContextType | undefined>(undefined);

const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'verif-1',
    applicantName: 'Tapan Dasgupta',
    email: 'tapan.guide@example.com',
    phone: '+91 98312 99887',
    category: 'GUIDE',
    district: 'Murshidabad',
    appliedDate: '2026-09-02',
    status: 'PENDING_VERIFICATION',
    documentType: 'ASI Tourism License & Govt ID Proof',
    verificationNotes: 'Pending credential check with Ministry of Tourism guide registry.'
  },
  {
    id: 'verif-2',
    applicantName: 'Gopal Modak',
    email: 'gopal.sweets@example.com',
    phone: '+91 98322 88776',
    category: 'LOCAL_FOOD_MERCHANT',
    district: 'Nadia',
    appliedDate: '2026-09-04',
    status: 'PENDING_VERIFICATION',
    documentType: 'FSSAI Food Hygiene Certificate & Trade License',
    verificationNotes: 'Nabadwip Doi Ghor branch verification.'
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-7891',
    serviceType: 'GUIDE',
    itemTitle: 'Bishnupur Terracotta Temples Architectural Tour',
    providerName: 'Sourav Gangopadhyay',
    date: '2026-10-12',
    time: '09:00 AM',
    guestsCount: 2,
    totalAmount: 3600,
    status: 'CONFIRMED',
    bookingDate: '2026-09-05'
  },
  {
    id: 'BK-7892',
    serviceType: 'WORKSHOP',
    itemTitle: 'Ancient Dokra Lost-Wax Bell Metal Casting Masterclass',
    providerName: 'Shyamal Karmakar',
    date: '2026-10-18',
    time: '10:00 AM',
    guestsCount: 1,
    totalAmount: 1850,
    status: 'CONFIRMED',
    bookingDate: '2026-09-06'
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-5401',
    customerName: 'Ananya Sen',
    merchantName: 'Nobin Chandra Das & Sons Legacy',
    items: [
      { id: 'item-1', title: 'Spongy Banglar Rosogolla (Tin / 6 Pcs)', quantity: 2, unitPrice: 180, itemType: 'FOOD' },
      { id: 'item-2', title: 'Nolen Gur Jalbhora Sandesh (4 Pcs)', quantity: 1, unitPrice: 240, itemType: 'FOOD' }
    ],
    totalAmount: 600,
    status: 'ACCEPTED',
    orderDate: '2026-09-07 18:30',
    deliveryAddress: 'Flat 4B, Heritage Enclave, South Avenue, Kolkata 700029'
  }
];

const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-101',
    complainantName: 'Rajarshi Banerjee',
    category: 'Guide Punctuality',
    subject: 'Delayed Start for Santiniketan Morning Walk',
    description: 'The guide arrived 45 minutes past the scheduled departure time at Uttarayan gate.',
    relatedService: 'Santiniketan Ashram Walk',
    status: 'OPEN',
    filedDate: '2026-09-05'
  }
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actor: 'Admin Moderator',
    action: 'MEMBER_VERIFIED',
    entityType: 'Guide',
    entityName: 'Sourav Gangopadhyay (Bankura)',
    timestamp: '2026-09-06 11:24',
    status: 'SUCCESS'
  },
  {
    id: 'log-2',
    actor: 'Admin Moderator',
    action: 'FUNDRAISER_APPROVED',
    entityType: 'Cleanliness Drive',
    entityName: 'Bhagirathi Clean Ghats Mission',
    timestamp: '2026-09-06 14:10',
    status: 'SUCCESS'
  },
  {
    id: 'log-3',
    actor: 'System Daemon',
    action: 'BACKUP_SYNC',
    entityType: 'Database',
    entityName: 'Canonical Catalogue (55 Sites, 15 Cultures)',
    timestamp: '2026-09-07 00:00',
    status: 'SUCCESS'
  }
];

export function PorjotokProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentRole, setCurrentRoleState] = useState<UserRole>('VISITOR');
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_USERS.VISITOR);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [verifications, setVerifications] = useState<VerificationRequest[]>(INITIAL_VERIFICATIONS);
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>(CANONICAL_FUNDRAISERS);
  const [userPoints, setUserPoints] = useState<number>(420);
  const [savedSiteSlugs, setSavedSiteSlugs] = useState<string[]>(['santiniketan', 'rasmancha', 'victoria-memorial']);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedLogin = localStorage.getItem('porjotok_is_logged_in');
      if (savedLogin !== null) {
        setIsLoggedIn(savedLogin === 'true');
      }

      const savedRole = localStorage.getItem('porjotok_role') as UserRole;
      if (savedRole && DEMO_USERS[savedRole]) {
        setCurrentRoleState(savedRole);
      }

      const savedUser = localStorage.getItem('porjotok_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      } else if (savedRole && DEMO_USERS[savedRole]) {
        setCurrentUser(DEMO_USERS[savedRole]);
      }

      const savedCart = localStorage.getItem('porjotok_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      
      const savedPoints = localStorage.getItem('porjotok_points');
      if (savedPoints) setUserPoints(Number(savedPoints));
    } catch {
      // ignore
    }
  }, []);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    try {
      localStorage.setItem('porjotok_role', role);
    } catch {}
    logAction('PORTAL_SWITCH', 'UserSession', `Active portal view switched to ${role}`);
  };

  const login = (email: string, _password?: string, role?: UserRole, customName?: string): boolean => {
    let resolvedRole: UserRole = role || 'VISITOR';
    if (!role) {
      if (email.toLowerCase().includes('admin') || email.endsWith('.gov.in')) {
        resolvedRole = 'ADMIN';
      } else if (email.includes('guide')) {
        resolvedRole = 'GUIDE';
      } else if (email.includes('sweet') || email.includes('food')) {
        resolvedRole = 'LOCAL_FOOD_MERCHANT';
      } else if (email.includes('craft') || email.includes('item') || email.includes('seller')) {
        resolvedRole = 'LOCAL_ITEM_SELLER';
      } else if (email.includes('clean') || email.includes('ghat')) {
        resolvedRole = 'CLEANLINESS_CREW';
      } else if (email.includes('artist') || email.includes('baul')) {
        resolvedRole = 'ARTIST';
      } else if (email.includes('research') || email.includes('dr.')) {
        resolvedRole = 'RESEARCHER';
      } else if (email.includes('workshop')) {
        resolvedRole = 'WORKSHOP_CONDUCTOR';
      }
    }

    const defaultForRole = DEMO_USERS[resolvedRole];
    const generatedName = customName || (
      email.toLowerCase() === defaultForRole.email.toLowerCase() 
        ? defaultForRole.name 
        : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    );

    const authenticatedUser: DemoUser = {
      ...defaultForRole,
      id: `user-${Date.now()}`,
      name: generatedName,
      email: email,
      role: resolvedRole
    };

    setIsLoggedIn(true);
    setCurrentRoleState(resolvedRole);
    setCurrentUser(authenticatedUser);

    try {
      localStorage.setItem('porjotok_is_logged_in', 'true');
      localStorage.setItem('porjotok_role', resolvedRole);
      localStorage.setItem('porjotok_user', JSON.stringify(authenticatedUser));
    } catch {}

    logAction('USER_LOGIN', 'Auth', `${authenticatedUser.name} (${authenticatedUser.role}) successfully authenticated`);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentRoleState('VISITOR');
    setCurrentUser(DEMO_USERS.VISITOR);
    try {
      localStorage.setItem('porjotok_is_logged_in', 'false');
      localStorage.removeItem('porjotok_user');
      localStorage.setItem('porjotok_role', 'VISITOR');
    } catch {}
    logAction('USER_LOGOUT', 'Auth', 'User logged out');
  };

  const registerUser = (data: { name: string; email: string; phone?: string; role: UserRole; district?: string }) => {
    const defaultForRole = DEMO_USERS[data.role];
    const newUser: DemoUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '+91 98000 00000',
      role: data.role,
      avatar: defaultForRole.avatar,
      district: data.district || 'Kolkata',
      bio: `${data.role.replace('_', ' ')} community member on Parampara.`,
      verified: data.role === 'VISITOR',
      subscriptionActive: true
    };

    setIsLoggedIn(true);
    setCurrentRoleState(data.role);
    setCurrentUser(newUser);

    try {
      localStorage.setItem('porjotok_is_logged_in', 'true');
      localStorage.setItem('porjotok_role', data.role);
      localStorage.setItem('porjotok_user', JSON.stringify(newUser));
    } catch {}

    logAction('USER_REGISTER', 'Auth', `${newUser.name} registered as ${newUser.role}`);
  };

  const logAction = (action: string, entityType: string, entityName: string, status: AuditLog['status'] = 'SUCCESS') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actor: currentUser?.name || DEMO_USERS[currentRole]?.name || 'Parampara User',
      action,
      entityType,
      entityName,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Cart actions
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      } else {
        updated = [...prev, item];
      }
      try { localStorage.setItem('porjotok_cart', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      try { localStorage.setItem('porjotok_cart', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const updated = prev.map(i => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      });
      try { localStorage.setItem('porjotok_cart', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try { localStorage.removeItem('porjotok_cart'); } catch {}
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Booking actions
  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => {
    const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id,
      status: 'CONFIRMED',
      bookingDate: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    addPoints(50, `Booked ${bookingData.itemTitle}`);
    logAction('NEW_BOOKING', bookingData.serviceType, `${bookingData.itemTitle} (${id})`);
    return id;
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
    logAction('CANCEL_BOOKING', 'Booking', id, 'WARNING');
  };

  // Order actions
  const placeOrder = (deliveryAddress: string) => {
    if (cart.length === 0) return '';
    const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id,
      customerName: DEMO_USERS[currentRole].name,
      merchantName: cart[0]?.merchantOrSeller || 'Parampara Verified Merchant',
      items: cart.map(c => ({
        id: c.id,
        title: c.name,
        quantity: c.quantity,
        unitPrice: c.price,
        itemType: c.type
      })),
      totalAmount: cartTotal,
      status: 'ACCEPTED',
      orderDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      deliveryAddress
    };
    setOrders(prev => [newOrder, ...prev]);
    addPoints(30, `Order placed (${id})`);
    clearCart();
    logAction('NEW_ORDER', 'Order', `${id} (₹${newOrder.totalAmount})`);
    return id;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // RBAC: Only verified merchants or administrators can transition order statuses
    const isAuthorized = currentUser.role === 'LOCAL_FOOD_MERCHANT' || currentUser.role === 'LOCAL_ITEM_SELLER' || currentUser.role === 'ADMIN';
    if (!isAuthorized) {
      logAction('SECURITY_VIOLATION', 'RBAC', `Unauthorized attempt to update order ${orderId} by ${currentUser.name} (${currentUser.role})`, 'ALERT');
      return;
    }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    logAction('ORDER_STATUS_UPDATE', 'Order', `${orderId} -> ${newStatus}`);
  };

  const elevateToAdmin = (passkey: string): { success: boolean; message: string } => {
    if (validateAdminPasskey(passkey)) {
      setCurrentRoleState('ADMIN');
      setCurrentUser(DEMO_USERS.ADMIN);
      try {
        localStorage.setItem('porjotok_role', 'ADMIN');
        localStorage.setItem('porjotok_user', JSON.stringify(DEMO_USERS.ADMIN));
        localStorage.setItem('porjotok_is_logged_in', 'true');
        setIsLoggedIn(true);
      } catch {}
      logAction('ADMIN_ELEVATION', 'RBAC', `${currentUser.name} elevated to ADMIN via verified security key`);
      return { success: true, message: 'Administrative access granted successfully.' };
    } else {
      logAction('SECURITY_ALERT', 'RBAC', `Unauthorized admin elevation attempt with invalid passkey`, 'ALERT');
      return { success: false, message: 'Invalid Admin Security Key. Access denied.' };
    }
  };

  const revokeAdminRole = () => {
    setCurrentRoleState('VISITOR');
    setCurrentUser(DEMO_USERS.VISITOR);
    try {
      localStorage.setItem('porjotok_role', 'VISITOR');
      localStorage.setItem('porjotok_user', JSON.stringify(DEMO_USERS.VISITOR));
    } catch {}
    logAction('ROLE_DOWNGRADE', 'RBAC', 'Administrator session revoked. Returned to Visitor mode.');
  };

  // Verifications (Admin Secured)
  const approveVerification = (id: string) => {
    if (currentRole !== 'ADMIN') {
      logAction('SECURITY_VIOLATION', 'RBAC', `Unauthorized attempt to approve verification ${id} by ${currentUser.name} (${currentRole})`, 'ALERT');
      return;
    }
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'VERIFIED' } : v));
    logAction('APPROVE_MEMBER', 'Verification', id);
  };

  const rejectVerification = (id: string) => {
    if (currentRole !== 'ADMIN') {
      logAction('SECURITY_VIOLATION', 'RBAC', `Unauthorized attempt to reject verification ${id} by ${currentUser.name} (${currentRole})`, 'ALERT');
      return;
    }
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'REJECTED' } : v));
    logAction('REJECT_MEMBER', 'Verification', id, 'WARNING');
  };

  // Fundraisers (Admin Secured)
  const approveFundraiser = (id: string) => {
    if (currentRole !== 'ADMIN') {
      logAction('SECURITY_VIOLATION', 'RBAC', `Unauthorized attempt to approve fundraiser ${id} by ${currentUser.name} (${currentRole})`, 'ALERT');
      return;
    }
    setFundraisers(prev => prev.map(f => f.id === id ? { ...f, status: 'ACTIVE' } : f));
    logAction('APPROVE_FUNDRAISER', 'Fundraiser', id);
  };

  const rejectFundraiser = (id: string) => {
    if (currentRole !== 'ADMIN') {
      logAction('SECURITY_VIOLATION', 'RBAC', `Unauthorized attempt to reject fundraiser ${id} by ${currentUser.name} (${currentRole})`, 'ALERT');
      return;
    }
    setFundraisers(prev => prev.map(f => f.id === id ? { ...f, status: 'REJECTED' } : f));
    logAction('REJECT_FUNDRAISER', 'Fundraiser', id, 'WARNING');
  };

  const donateToFundraiser = (fundraiserId: string, amount: number) => {
    setFundraisers(prev => prev.map(f => {
      if (f.id === fundraiserId) {
        return {
          ...f,
          raisedAmount: f.raisedAmount + amount,
          donorsCount: f.donorsCount + 1
        };
      }
      return f;
    }));
    addPoints(25, `Donated ₹${amount} to community cleanliness drive`);
    logAction('COMMUNITY_DONATION', 'Fundraiser', `${fundraiserId} (+₹${amount})`);
  };

  // Gamification & Rewards
  const addPoints = (pts: number, reason: string) => {
    setUserPoints(prev => {
      const updated = prev + pts;
      try { localStorage.setItem('porjotok_points', String(updated)); } catch {}
      return updated;
    });
    logAction('EARNED_POINTS', 'Gamification', `+${pts} pts: ${reason}`);
  };

  const toggleSaveSite = (slug: string) => {
    setSavedSiteSlugs(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  // Complaints (Admin Secured)
  const fileComplaint = (compData: Omit<Complaint, 'id' | 'filedDate' | 'status'>) => {
    const id = `CMP-${Math.floor(100 + Math.random() * 900)}`;
    const newComplaint: Complaint = {
      ...compData,
      id,
      filedDate: new Date().toISOString().split('T')[0],
      status: 'OPEN'
    };
    setComplaints(prev => [newComplaint, ...prev]);
    logAction('COMPLAINT_FILED', 'Complaint', id, 'WARNING');
  };

  const resolveComplaint = (id: string) => {
    if (currentRole !== 'ADMIN') {
      logAction('SECURITY_VIOLATION', 'RBAC', `Unauthorized attempt to resolve complaint ${id} by ${currentUser.name} (${currentRole})`, 'ALERT');
      return;
    }
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'RESOLVED' } : c));
    logAction('COMPLAINT_RESOLVED', 'Complaint', id);
  };

  return (
    <PorjotokContext.Provider
      value={{
        isLoggedIn,
        currentRole,
        setCurrentRole,
        currentUser,
        login,
        logout,
        registerUser,
        elevateToAdmin,
        revokeAdminRole,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        bookings,
        addBooking,
        cancelBooking,
        orders,
        placeOrder,
        updateOrderStatus,
        verifications,
        approveVerification,
        rejectVerification,
        fundraisers,
        approveFundraiser,
        rejectFundraiser,
        donateToFundraiser,
        userPoints,
        addPoints,
        savedSiteSlugs,
        toggleSaveSite,
        complaints,
        fileComplaint,
        resolveComplaint,
        auditLogs,
        logAction
      }}
    >
      {children}
    </PorjotokContext.Provider>
  );
}

export function usePorjotok() {
  const context = useContext(PorjotokContext);
  if (!context) {
    throw new Error('usePorjotok must be used within a PorjotokProvider');
  }
  return context;
}
