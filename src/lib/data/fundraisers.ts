import { Fundraiser } from '@/types';

export const CANONICAL_FUNDRAISERS: Fundraiser[] = [
  {
    id: 'fund-1',
    title: 'Post-Festive Clean River Ghats & Floral Bio-Composting Drive',
    crewName: 'Bhagirathi Clean Ghats Mission',
    district: 'Kolkata',
    location: 'Babu Ghat & Prinsep Ghat, Hooghly Riverfront',
    targetAmount: 150000,
    raisedAmount: 112400,
    donorsCount: 236,
    purpose: 'Procure waterborne skimmer nets, safety equipment for 50 youth volunteers, and mobile organic bio-composting shredders to transform festival marigolds and bel leaves into organic fertilizer.',
    description: 'Every year, thousands of floral offerings and clay silt accumulate along Kolkata’s heritage ghats after major festivals. Our crew works dawn to dusk to prevent non-biodegradable synthetic pollutants from reaching the mangrove delta.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    status: 'ACTIVE'
  },
  {
    id: 'fund-2',
    title: 'Bishnupur Terracotta Sanctuary Plastic-Free Guarding Initiative',
    crewName: 'Bishnupur Temple Heritage Green Force',
    district: 'Bankura',
    location: 'Rasmancha, Jor Bangla & Dalmadal Gun Precincts',
    targetAmount: 85000,
    raisedAmount: 64200,
    donorsCount: 148,
    purpose: 'Install eco-friendly terracotta dustbins, heritage signage boards in 3 languages, and provide reusable cotton shoe covers for visitors entering protected brick sanctuaries.',
    description: 'Guarding the fragile 400-year-old terracotta tiles from scratch damage, litter, and plastic bottle accumulation. Driven by students and local Bishnupur residents.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-09-15',
    endDate: '2026-12-15',
    status: 'ACTIVE'
  },
  {
    id: 'fund-3',
    title: 'Darjeeling Himalayan Toy Train Line Ridge Cleanup Drive',
    crewName: 'Himalayan Ridge Keepers',
    district: 'Darjeeling',
    location: 'Batasia Loop to Ghum Station',
    targetAmount: 120000,
    raisedAmount: 0,
    donorsCount: 0,
    purpose: 'Equip volunteer mountain climbers with ropes and waste collection bags to clear single-use plastics from the steep railway embankments along the DHR UNESCO corridor.',
    description: 'Submitted by the local youth council of Ghum and awaiting administrative vetting and safety clearance.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    status: 'PENDING_APPROVAL'
  }
];
