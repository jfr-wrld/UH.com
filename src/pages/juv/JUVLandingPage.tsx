import React, { useState, useEffect, useRef } from 'react';
import './juv-landing.css';
import { User, UserCheck, Building2, Heart, BadgeCheck, ChevronLeft, ChevronRight, ShieldCheck, Lock, Headphones, Quote, CreditCard, Plane } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================
interface JUVLandingPageProps {
  isAuthenticated: boolean;
}

interface PackageData {
  id: string;
  name: string;
  agency: string;
  verified: boolean;
  category: string;
  hotelStars: number;
  departure: string;
  duration: string;
  seatsLeft: number;
  rating: number;
  reviews: number;
  originalPrice: number;
  currentPrice: number;
  airline: string;
  departureCity: string;
  image: string;
  isPromo: boolean;
  discount: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================
const packages: PackageData[] = [
  {
    id: 'PKG-001', name: 'Regular Umrah 12 Days – Makkah & Madinah', agency: 'Al Safwa Travel',
    verified: true, category: 'Umrah', hotelStars: 4, departure: 'Sep 2026', duration: '12 days',
    seatsLeft: 8, rating: 4.8, reviews: 124, originalPrice: 8490, currentPrice: 7890,
    airline: 'Saudi Airlines', departureCity: 'Kuala Lumpur', isPromo: true, discount: 7,
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80'
  },
  {
    id: 'PKG-002', name: 'Premium Umrah Plus 14 Days – VIP Suite', agency: 'Zamzam Travels',
    verified: true, category: 'Umrah', hotelStars: 5, departure: 'Oct 2026', duration: '14 days',
    seatsLeft: 4, rating: 4.9, reviews: 89, originalPrice: 12900, currentPrice: 11500,
    airline: 'Emirates', departureCity: 'Kuala Lumpur', isPromo: true, discount: 11,
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80'
  },
  {
    id: 'PKG-003', name: 'Economy Umrah 10 Days – Budget Friendly', agency: 'Barakah Tours',
    verified: true, category: 'Umrah', hotelStars: 3, departure: 'Aug 2026', duration: '10 days',
    seatsLeft: 22, rating: 4.5, reviews: 210, originalPrice: 5990, currentPrice: 5990,
    airline: 'AirAsia X', departureCity: 'KLIA2', isPromo: false, discount: 0,
    image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80'
  },
  {
    id: 'PKG-004', name: 'Hajj Plus 2027 – Complete Package', agency: 'Salam Travel & Tours',
    verified: true, category: 'Hajj', hotelStars: 5, departure: 'Jun 2027', duration: '40 days',
    seatsLeft: 12, rating: 4.9, reviews: 56, originalPrice: 32000, currentPrice: 29500,
    airline: 'Saudi Airlines', departureCity: 'Kuala Lumpur', isPromo: true, discount: 8,
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80'
  },
  {
    id: 'PKG-005', name: 'Family Umrah 12 Days – Kids Friendly', agency: 'Al Safwa Travel',
    verified: true, category: 'Family', hotelStars: 4, departure: 'Dec 2026', duration: '12 days',
    seatsLeft: 6, rating: 4.7, reviews: 78, originalPrice: 7200, currentPrice: 6800,
    airline: 'Malaysia Airlines', departureCity: 'KLIA', isPromo: false, discount: 0,
    image: 'https://images.unsplash.com/photo-1565019001379-1cecc66bcf74?w=600&q=80'
  },
  {
    id: 'PKG-006', name: 'Express Umrah 7 Days – Short & Sweet', agency: 'Kauthar Travel',
    verified: true, category: 'Umrah', hotelStars: 4, departure: 'Nov 2026', duration: '7 days',
    seatsLeft: 15, rating: 4.6, reviews: 143, originalPrice: 6500, currentPrice: 5990,
    airline: 'Saudi Airlines', departureCity: 'Penang', isPromo: true, discount: 8,
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&q=80'
  },
  {
    id: 'PKG-007', name: 'Umrah Ramadan Special 15 Days', agency: 'Ansar Medina Travel',
    verified: true, category: 'Umrah', hotelStars: 5, departure: 'Mar 2027', duration: '15 days',
    seatsLeft: 3, rating: 4.9, reviews: 67, originalPrice: 15000, currentPrice: 13200,
    airline: 'Emirates', departureCity: 'Kuala Lumpur', isPromo: true, discount: 12,
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=600&q=80'
  },
  {
    id: 'PKG-008', name: 'Muslim Trip Turkey & Umrah 18 Days', agency: 'Global Travel Agency',
    verified: true, category: 'Muslim Trip', hotelStars: 4, departure: 'Jan 2027', duration: '18 days',
    seatsLeft: 10, rating: 4.7, reviews: 34, originalPrice: 9800, currentPrice: 9200,
    airline: 'Turkish Airlines', departureCity: 'Kuala Lumpur', isPromo: false, discount: 0,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80'
  },
];

const testimonials = [
  { id: 1, name: 'Ahmad Razak', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', pkg: 'Regular Umrah 12 Days', agency: 'Al Safwa Travel', rating: 5, quote: 'An incredibly well-organized journey. The hotel was steps from Masjid al-Haram, and the mutawwif guidance was outstanding. My family felt safe and spiritually fulfilled throughout.', date: 'May 2026', verified: true },
  { id: 2, name: 'Siti Nurhaliza', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', pkg: 'Premium Umrah Plus', agency: 'Zamzam Travels', rating: 5, quote: 'The VIP experience exceeded expectations. Private transport, 5-star hotels, and a dedicated guide made this the most memorable spiritual journey for our entire family.', date: 'Apr 2026', verified: true },
  { id: 3, name: 'Mohammed Ismail', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', pkg: 'Economy Umrah 10 Days', agency: 'Barakah Tours', rating: 4, quote: 'Great value for money. The accommodation was clean and close to the Haram. Perfect for first-time pilgrims on a budget. Will definitely recommend to friends.', date: 'Mar 2026', verified: true },
  { id: 4, name: 'Fatimah Abdullah', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', pkg: 'Family Umrah 12 Days', agency: 'Al Safwa Travel', rating: 5, quote: 'Traveling with 3 kids was a breeze. The agency arranged everything from child-friendly meals to stroller-accessible transport. Truly a family-first experience.', date: 'Feb 2026', verified: true },
];

export const faqCategories: { label: string; icon: React.ReactNode }[] = [
  { label: 'Booking & Payment', icon: <CreditCard size={18} /> },
  { label: 'Travel & Preparation', icon: <Plane size={18} /> },
  { label: 'Platform Security', icon: <ShieldCheck size={18} /> },
];
const faqData = [
  { cat: 'Booking & Payment', q: 'How do I book an Umrah or Hajj package?', a: 'Browse our packages, select one that suits your needs, and click "View Details". You can then choose your preferred departure date, room type, and number of travellers. Complete the booking by submitting traveller information and making the initial deposit payment.' },
  { cat: 'Booking & Payment', q: 'What payment methods do you accept?', a: 'We accept online bank transfers (FPX), credit/debit cards, and manual bank transfers. Payment options and installment plans may vary by travel agency. All payments are tracked transparently in your booking dashboard.' },
  { cat: 'Booking & Payment', q: 'Can I cancel or modify my booking?', a: 'Cancellation and modification policies depend on the travel agency\'s terms. Generally, cancellations made 60+ days before departure receive a partial refund. Check the specific package\'s cancellation policy before booking.' },
  { cat: 'Booking & Payment', q: 'Are there discounts for group bookings?', a: 'Many travel agencies offer group discounts for bookings of 10 or more pilgrims. Contact the agency directly through the platform or use the "Group Booking" option on the package detail page.' },
  { cat: 'Travel & Preparation', q: 'What documents do I need for Umrah/Hajj?', a: 'You\'ll need a valid passport (at least 6 months validity), passport-sized photos, vaccination certificates (Meningitis ACWY), and a valid Mahram letter for female travellers under 45 traveling without a male guardian. The platform will guide you through document requirements after booking.' },
  { cat: 'Travel & Preparation', q: "What's the difference between package types?", a: 'Economy packages offer basic 3-star accommodations, Standard includes 4-star hotels with closer proximity to the Haram, Premium offers 5-star luxury with private transport, and VIP includes exclusive services like private Tawaf guides and suite accommodations.' },
  { cat: 'Travel & Preparation', q: 'Do you provide support during the pilgrimage?', a: 'Yes, each group is accompanied by experienced mutawwif (pilgrimage guides). Additionally, our platform support team is available 24/7 for booking-related inquiries. Emergency contacts are provided in your trip dashboard.' },
  { cat: 'Platform Security', q: 'How do you verify travel agencies?', a: 'All agencies on UmrahHaji.com undergo a rigorous verification process including MOTAC license verification, SSM registration check, bank account validation, and operational history review. Only verified agencies can publish packages.' },
];

// ============================================================================
// SVG ICON COMPONENTS
// ============================================================================
const IconKaaba = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="20" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
    <path d="M4 28H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 4L6 10H26L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <rect x="13" y="16" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 14H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IconMosque = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 6 8 8V20H16V8C16 6 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4 20V14C4 12 6 10 6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 20V14C20 12 18 10 18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 20H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="9" r="1" fill="currentColor" />
    <rect x="10" y="15" width="4" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconVerified = () => (
  <BadgeCheck size={16} strokeWidth={2} />
);

const IconStar = ({ filled = true }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill={filled ? '#F5A623' : 'none'} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L8.85 4.75L13 5.35L10 8.25L10.7 12.35L7 10.4L3.3 12.35L4 8.25L1 5.35L5.15 4.75L7 1Z" stroke="#F5A623" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="juv-faq-chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="2" />
    <path d="M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8.5L11 2L19 8.5V18C19 18.5523 18.5523 19 18 19H4C3.44772 19 3 18.5523 3 18V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 19V12H14V19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconPackages = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L8.5 3L14.5 6L20 3V17L14.5 20L8.5 17L3 20V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 3V17M14.5 6V20" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconTrip = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7V5C7 3.895 7.895 3 9 3H13C14.105 3 15 3.895 15 5V7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 12H19" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconGuide = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H18V20H6.5C5.83696 20 5.20107 19.7366 4.73223 19.2678C4.26339 18.7989 4 18.163 4 17.5V4.5C4 3.837 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconProfile = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 20C3 16.134 6.58172 13 11 13C15.4183 13 19 16.134 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.5 1V3.5M9.5 1V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPlane = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 8L6 6.5L7 2L8 6.5L12.5 8L8 9.5L7 12L6 9.5L1.5 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const IconHotel = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12V3C2 2.44772 2.44772 2 3 2H11C11.5523 2 12 2.44772 12 3V12" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1 12H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="5" y="5" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
    <path d="M7 9V12" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12.5C7 12.5 11.5 9 11.5 5.5C11.5 3.01472 9.48528 1 7 1C4.51472 1 2.5 3.01472 2.5 5.5C2.5 9 7 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2L3 6V11C3 15.97 6.42 20.61 11 21.5C15.58 20.61 19 15.97 19 11V6L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 11L10 13L14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHeadphones = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12V11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11V12" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="15" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11C2 11 5 5 11 5C17 5 20 11 20 11C20 11 17 17 11 17C5 17 2 11 2 11Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSwitch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L1 3L4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 3H11C13.2091 3 15 4.79086 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 10L15 13L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 13H5C2.79086 13 1 11.2091 1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IslamicPattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="islamic-geo-white" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
        <path d="M30 0L60 15L60 45L30 60L0 45L0 15Z" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="30" cy="30" r="8" fill="none" stroke="white" strokeWidth="0.3" />
        <path d="M30 0L30 60M0 30L60 30" stroke="white" strokeWidth="0.2" />
        <path d="M15 7.5L45 7.5M15 52.5L45 52.5" stroke="white" strokeWidth="0.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#islamic-geo-white)" />
  </svg>
);

const IslamicPatternTeal = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0 }}>
    <circle className="juv-bg-circle juv-bg-circle-1" cx="5%" cy="20%" r="120" fill="none" stroke="#0694A2" strokeWidth="2" />
    <circle className="juv-bg-circle juv-bg-circle-2" cx="85%" cy="10%" r="80" fill="none" stroke="#0694A2" strokeWidth="1.5" />
    <circle className="juv-bg-circle juv-bg-circle-3" cx="70%" cy="75%" r="160" fill="none" stroke="#0694A2" strokeWidth="2" />
    <circle className="juv-bg-circle juv-bg-circle-4" cx="15%" cy="80%" r="100" fill="none" stroke="#0694A2" strokeWidth="1.5" />
    <circle className="juv-bg-circle juv-bg-circle-5" cx="50%" cy="50%" r="200" fill="none" stroke="#0694A2" strokeWidth="1" />
    <circle className="juv-bg-circle juv-bg-circle-6" cx="95%" cy="45%" r="90" fill="none" stroke="#0694A2" strokeWidth="1.5" />
    <circle className="juv-bg-circle juv-bg-circle-7" cx="35%" cy="15%" r="60" fill="none" stroke="#0694A2" strokeWidth="1" />
    <circle className="juv-bg-circle juv-bg-circle-8" cx="25%" cy="55%" r="140" fill="none" stroke="#0694A2" strokeWidth="1" />
  </svg>
);

// ============================================================================
// SCROLL REVEAL HOOK
// ============================================================================
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`juv-reveal ${className}`} style={style}>{children}</div>;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const JUVLandingPage: React.FC<JUVLandingPageProps> = ({ isAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeGuideTab, setActiveGuideTab] = useState('Guides');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState(faqCategories[0].label);
  const [searchCategory, setSearchCategory] = useState<'umrah' | 'hajj' | 'tours'>('umrah');
  const [searchDeparture, setSearchDeparture] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerMobileOpen, setRegisterMobileOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState({ date: 'Any Time', duration: '10 - 14 Days', type: 'All Types', budget: 'Any Range' });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.juv-search-field-modern')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const categories = ['All', 'Umrah', 'Hajj', 'Muslim Trip', 'Family'];

  const filteredPackages = packages.filter(pkg => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Promo') return pkg.isPromo;
    return pkg.category === activeCategory;
  });

  const promoPackages = packages.filter(p => p.isPromo);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  // ==========================================================================
  // RENDER: PACKAGE CARD
  // ==========================================================================
  const PackageCard = ({ pkg, isCarousel = false, hidePromo = false }: { pkg: PackageData; isCarousel?: boolean; hidePromo?: boolean }) => (
    <div className={`juv-pkg-card ${isCarousel ? 'juv-carousel-card' : ''}`}>
      <div className="juv-pkg-img">
        <img src={pkg.image} alt={pkg.name} loading="lazy" />
        <div className="juv-pkg-badges">
          <span className="juv-badge juv-badge-category">{pkg.category}</span>
          {pkg.isPromo && !hidePromo && <span className="juv-badge juv-badge-promo">{pkg.discount}% OFF</span>}
        </div>
        {pkg.seatsLeft <= 10 && (
          <span className="juv-badge-seats">{pkg.seatsLeft} seats left</span>
        )}
        <button className="juv-pkg-like-btn" onClick={(e) => { e.preventDefault(); e.currentTarget.classList.toggle('active'); }}>
          <Heart size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="juv-pkg-body">
        <div className="juv-pkg-agency">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(pkg.agency)}&background=random&color=fff&size=24`} alt={pkg.agency} className="juv-pkg-agency-avatar" />
          {pkg.agency}
          {pkg.verified && <IconVerified />}
        </div>
        <div className="juv-pkg-name">{pkg.name}</div>
        <div className="juv-pkg-highlight">
          <span className="juv-pkg-meta-item"><IconClock />{pkg.duration}</span>
          <span className="juv-pkg-meta-item"><IconMapPin />{pkg.departureCity}</span>
        </div>
        <div className="juv-pkg-meta" style={{ marginTop: 'auto' }}>
          <span className="juv-pkg-rating">
            <IconStar />{pkg.rating} <span style={{ color: 'var(--juv-text-muted)', fontWeight: 400 }}>({pkg.reviews})</span>
          </span>
          <span className="juv-pkg-meta-item"><IconCalendar />{pkg.departure}</span>
        </div>
      </div>
      <div className="juv-pkg-divider" />
      <div className="juv-pkg-footer">
        <div className="juv-pkg-price">
          {pkg.isPromo && !hidePromo && <span className="juv-pkg-price-original">RM {pkg.originalPrice.toLocaleString()}</span>}
          <span className="juv-pkg-price-current">
            RM {pkg.currentPrice.toLocaleString()}
            <span className="juv-pkg-price-per"> /pax</span>
          </span>
        </div>
      </div>
    </div>
  );

  // ==========================================================================
  // CAROUSEL WRAPPER
  // ==========================================================================
  const Carousel = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
      }
    };

    useEffect(() => {
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }, [children]);

    const scrollBy = (amount: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      }
    };

    return (
      <div className="juv-carousel-wrapper">
        {canScrollLeft && (
          <button className="juv-carousel-nav left" onClick={() => scrollBy(-350)} aria-label="Scroll left">
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="juv-carousel" ref={scrollRef} onScroll={checkScroll}>
          {children}
        </div>
        {canScrollRight && (
          <button className="juv-carousel-nav right" onClick={() => scrollBy(350)} aria-label="Scroll right">
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    );
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="juv">
      {/* ================================================================
          NAVBAR
          ================================================================ */}
      <nav className={`juv-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="juv-navbar-inner">
          <a href="#" className="juv-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/brand/logo-full.svg" alt="UmrahHaji" className="juv-logo-img" />
          </a>

          <div className="juv-nav-links">
            <button className="juv-nav-link active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
            <button className="juv-nav-link" onClick={() => scrollToSection('packages')}>Packages</button>
            <button className="juv-nav-link" onClick={() => scrollToSection('destinations')}>Destinations</button>
            <button className="juv-nav-link" onClick={() => scrollToSection('guides')}>Guides</button>
            <button className="juv-nav-link" onClick={() => scrollToSection('faq')}>FAQ</button>
            <button className="juv-nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>

          <div className="juv-nav-actions">
            {!isAuthenticated ? (
              <div className="juv-desktop-auth" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button className="juv-btn juv-btn-outline juv-btn-sm" style={{ minWidth: '100px', height: '36px', boxSizing: 'border-box' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}>Login</button>
                <div style={{ position: 'relative' }}>
                  <button className="juv-btn juv-btn-primary juv-btn-sm" style={{ minWidth: '110px', height: '36px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', ...(registerOpen ? { background: 'var(--juv-primary-dark)' } : {}) }} onClick={() => setRegisterOpen(!registerOpen)}>
                    Register
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: registerOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  {registerOpen && (
                    <div className="juv-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, minWidth: '200px' }}>
                      <button className="juv-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}><User size={16} color="#3b82f6" /> Register as Jamaah</button>
                      <button className="juv-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}><UserCheck size={16} color="#10b981" /> Register as Mutawwif</button>
                      <button className="juv-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}><Building2 size={16} color="#8b5cf6" /> Register as Travel Agency</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="juv-profile-dropdown-container">
                <button className="juv-profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                  <img src="https://i.pravatar.cc/100?img=11" alt="Profile" />
                  <span className="juv-profile-name">Ahmad Zaki</span>
                </button>

                {profileOpen && (
                  <div className="juv-dropdown-menu">
                    <button className="juv-dropdown-item"><IconProfile /> Profile</button>
                    <div className="juv-dropdown-divider"></div>
                    <button className="juv-dropdown-item" style={{ color: '#dc2626' }} onClick={() => { localStorage.removeItem('erp_auth'); window.location.reload(); }}>Logout</button>
                  </div>
                )}
              </div>
            )}
            <button className="juv-mobile-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* ================================================================
          MOBILE DRAWER
          ================================================================ */}
      <div className={`juv-drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`juv-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="juv-drawer-header">
          <span style={{ fontWeight: 700, color: 'var(--juv-primary)', fontSize: '16px' }}>Menu</span>
          <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <IconX />
          </button>
        </div>
        <div className="juv-drawer-body">
          <button className="juv-drawer-link" onClick={() => scrollToSection('hero')}><IconHome /> Home</button>
          <button className="juv-drawer-link" onClick={() => scrollToSection('packages')}><IconPackages /> Packages</button>
          <button className="juv-drawer-link" onClick={() => scrollToSection('destinations')}><IconMosque /> Destinations</button>
          <button className="juv-drawer-link" onClick={() => scrollToSection('guides')}><IconGuide /> Guides</button>
          <button className="juv-drawer-link" onClick={() => scrollToSection('faq')}><IconGuide /> FAQ</button>
          <button className="juv-drawer-link" onClick={() => scrollToSection('contact')}><IconHeadphones /> Contact</button>
        </div>
        <div className="juv-drawer-footer">
          <button className="juv-btn juv-btn-outline juv-btn-md" style={{ width: '100%', height: '42px', boxSizing: 'border-box' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}>Login</button>
          <div style={{ position: 'relative', width: '100%' }}>
            <button className="juv-btn juv-btn-primary juv-btn-md" style={{ width: '100%', height: '42px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', ...(registerMobileOpen ? { background: 'var(--juv-primary-dark)' } : {}) }} onClick={() => setRegisterMobileOpen(!registerMobileOpen)}>
              Register
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: registerMobileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            {registerMobileOpen && (
              <div className="juv-dropdown-menu" style={{ position: 'absolute', bottom: 'calc(100% + 4px)', left: 0, width: '100%' }}>
                <button className="juv-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}><User size={16} color="#3b82f6" /> Register as Jamaah</button>
                <button className="juv-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}><UserCheck size={16} color="#10b981" /> Register as Mutawwif</button>
                <button className="juv-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { localStorage.setItem('erp_auth', 'true'); window.location.reload(); }}><Building2 size={16} color="#8b5cf6" /> Register as Travel Agency</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="juv-hero" id="hero">
        <div className="juv-hero-bg">
          <img src="/bg_hero_3d.png" alt="Majestic Makkah 3D" style={{ objectFit: 'cover', opacity: 1 }} />
        </div>

        <div className="juv-hero-content-wrapper">
          <div className="juv-hero-content">
            <h1 className="juv-hero-title animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Begin Your Sacred Journey <br />
              <span className="juv-hero-highlight">with Confidence</span>
            </h1>
            <p className="juv-hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Compare Umrah & Hajj packages from verified travel agencies. Find the right departure, accommodation, and price—all in one trusted place.
            </p>

          </div>
        </div>

        {/* Search Panel */}
        <div className="juv-search-panel-container animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="juv-search-panel-wrapper">

            <div className="juv-search-panel-box">
              <div className="juv-search-tabs-wrapper">
                <div className="juv-search-tabs">
                  <button className={`juv-search-tab ${searchCategory === 'umrah' ? 'active' : ''}`} onClick={() => setSearchCategory('umrah')}>
                    <IconKaaba /> Umrah
                  </button>
                  <button className={`juv-search-tab ${searchCategory === 'hajj' ? 'active' : ''}`} onClick={() => setSearchCategory('hajj')}>
                    <IconMosque /> Hajj
                  </button>
                  <button className="juv-search-tab" style={{ cursor: 'not-allowed', opacity: 0.7 }} onClick={(e) => e.preventDefault()}>
                    <IconMapPin /> Islamic Tours
                    <span className="juv-badge-coming-soon">Coming Soon</span>
                  </button>
                </div>
              </div>
              <div className="juv-search-box-header">
                <div className="juv-search-box-title">
                  <IconSearch /> Find Your Perfect Package
                </div>
                <button className="juv-search-box-link">
                  Not sure when to go? View all packages <IconArrowRight />
                </button>
              </div>

              <div className="juv-search-box-body">
                <div className="juv-search-field-modern" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}>
                  <div className="juv-search-field-icon"><IconCalendar /></div>
                  <div className="juv-search-field-content">
                    <label>Departure Date</label>
                    <span className="juv-search-field-value">{searchFilter.date}</span>
                  </div>
                  {activeDropdown === 'date' && (
                    <div className="juv-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', minWidth: '200px', zIndex: 10 }}>
                      {['Any Time', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027'].map(opt => (
                        <button key={opt} className="juv-dropdown-item" onClick={(e) => { e.stopPropagation(); setSearchFilter(prev => ({ ...prev, date: opt })); setActiveDropdown(null); }}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="juv-search-divider" />

                <div className="juv-search-field-modern" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}>
                  <div className="juv-search-field-icon"><IconClock /></div>
                  <div className="juv-search-field-content">
                    <label>Duration</label>
                    <span className="juv-search-field-value">{searchFilter.duration}</span>
                  </div>
                  {activeDropdown === 'duration' && (
                    <div className="juv-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', minWidth: '200px', zIndex: 10 }}>
                      {['Any Duration', 'Under 10 Days', '10 - 14 Days', '15 - 20 Days', 'Over 20 Days'].map(opt => (
                        <button key={opt} className="juv-dropdown-item" onClick={(e) => { e.stopPropagation(); setSearchFilter(prev => ({ ...prev, duration: opt })); setActiveDropdown(null); }}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="juv-search-divider" />

                <div className="juv-search-field-modern" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}>
                  <div className="juv-search-field-icon"><IconPackages /></div>
                  <div className="juv-search-field-content">
                    <label>Package Type</label>
                    <span className="juv-search-field-value">{searchFilter.type}</span>
                  </div>
                  {activeDropdown === 'type' && (
                    <div className="juv-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', minWidth: '200px', zIndex: 10 }}>
                      {['All Types', 'Regular', 'Premium', 'VIP', 'Backpacker', 'Family'].map(opt => (
                        <button key={opt} className="juv-dropdown-item" onClick={(e) => { e.stopPropagation(); setSearchFilter(prev => ({ ...prev, type: opt })); setActiveDropdown(null); }}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="juv-search-divider" />

                <div className="juv-search-field-modern" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')}>
                  <div className="juv-search-field-icon" style={{ fontSize: '18px', fontWeight: 'bold' }}>RM</div>
                  <div className="juv-search-field-content">
                    <label>Budget Range</label>
                    <span className="juv-search-field-value">{searchFilter.budget}</span>
                  </div>
                  {activeDropdown === 'budget' && (
                    <div className="juv-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: '100%', minWidth: '200px', zIndex: 10 }}>
                      {['Any Range', 'Under RM 5,000', 'RM 5,000 - 10,000', 'RM 10,000 - 15,000', 'Above RM 15,000'].map(opt => (
                        <button key={opt} className="juv-dropdown-item" onClick={(e) => { e.stopPropagation(); setSearchFilter(prev => ({ ...prev, budget: opt })); setActiveDropdown(null); }}>{opt}</button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="juv-search-btn-yellow">
                  <IconSearch /> Search
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================
          LIMITED TIME OFFERS
          ================================================================ */}
      <RevealSection>
        <section className="juv-section" id="offers" style={{ paddingBottom: '32px' }}>
          <div className="juv-section-header-row juv-anim-slide-left">
            <div className="juv-section-header" style={{ marginBottom: 0 }}>
              <h2 className="juv-section-title">
                Limited Time Offers
              </h2>
              <p className="juv-section-subtitle">Special promotions from verified travel agencies</p>
            </div>
            <button className="juv-btn juv-btn-text">View All Offers <IconArrowRight /></button>
          </div>
          <div className="juv-anim-slide-left juv-delay-2" style={{ marginTop: '24px' }}>
            <Carousel>
              {promoPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} isCarousel />
              ))}
            </Carousel>
          </div>
        </section>
      </RevealSection>

      {/* ================================================================
          PROMO BANNER
          ================================================================ */}
      <RevealSection>
        <section className="juv-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #F0F9FA 0%, #E6F4F6 100%)', maxWidth: '100%', borderTop: '1px solid var(--juv-border-soft)', borderBottom: '1px solid var(--juv-border-soft)' }}>
          {/* Decorative Pattern */}
          <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(6, 148, 162, 0.15)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(6, 148, 162, 0.15)', pointerEvents: 'none' }} />
          
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            <div className="juv-section-header juv-anim-child">
              <h2 className="juv-section-title">Exclusive Promotions</h2>
              <p className="juv-section-subtitle">Don't miss out on these limited-time deals from our verified partners</p>
            </div>
            <div className="juv-promo-banners-container juv-anim-zoom">
              <Carousel>
                {[
                  { id: 1, src: "/promos/promo_banner_1_1782741920951.png", alt: "Special Umrah Promo" },
                  { id: 2, src: "/promos/promo_banner_2_1782741931548.png", alt: "Early Bird Hajj" },
                  { id: 3, src: "/promos/promo_banner_3_1782741945491.png", alt: "Family Holiday Packages" }
                ].map(banner => (
                  <div key={banner.id} className="juv-promo-banner-card">
                    <img src={banner.src} alt={banner.alt} loading="lazy" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ================================================================
          FEATURED PACKAGES
          ================================================================ */}
      <RevealSection>
        <section className="juv-section" id="packages" style={{ paddingTop: '32px' }}>
          <div className="juv-section-header-row juv-anim-child">
            <div>
              <h2 className="juv-section-title">Featured Packages</h2>
              <p className="juv-section-subtitle">Discover the perfect journey tailored to your needs</p>
            </div>
            <button className="juv-btn juv-btn-text">View All Packages <IconArrowRight /></button>
          </div>

          <div className="juv-tabs-pills juv-anim-slide-right juv-delay-1">
            {categories.map(cat => (
              <button
                key={cat}
                className={`juv-tab-pill ${activeCategory === cat ? 'active' : ''} ${cat === 'Promo' ? 'juv-tab-pill-promo' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'Promo' && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '6px' }}><path d="M7 1L8.5 5H12.5L9.25 7.5L10.5 12L7 9L3.5 12L4.75 7.5L1.5 5H5.5L7 1Z" fill="currentColor" /></svg>}
                {cat}
              </button>
            ))}
          </div>
          <div className="juv-anim-child juv-delay-2" style={{ marginTop: '24px' }}>
            <div className="juv-pkg-grid">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} hidePromo={true} />
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ================================================================
          TRUST INDICATORS
          ================================================================ */}
      <RevealSection className="juv-trust-section">
        <section className="juv-section" id="trust" style={{ padding: '48px 24px' }}>
          <div className="juv-trust-banner">
            <div className="juv-trust-banner-pattern"><IslamicPattern /></div>
            <div className="juv-trust-banner-content">
              <div className="juv-trust-header juv-anim-child">
                <h2>Why Pilgrims Trust Us</h2>
                <p>Verified travel agencies, transparent booking, and dedicated pilgrim support every step of the way.</p>
              </div>
              <div className="juv-trust-stats-grid">
                <div className="juv-trust-feature-item juv-anim-pop">
                  <div className="juv-trust-feature-icon"><BadgeCheck size={32} /></div>
                  <div className="juv-trust-feature-title">100% Verified Agencies</div>
                  <div className="juv-trust-feature-desc">All our partner travel agencies are MOTAC licensed and fully verified.</div>
                </div>
                <div className="juv-trust-feature-item juv-anim-pop">
                  <div className="juv-trust-feature-icon"><ShieldCheck size={32} /></div>
                  <div className="juv-trust-feature-title">Transparent Pricing</div>
                  <div className="juv-trust-feature-desc">No hidden fees. Compare packages clearly based on facilities and locations.</div>
                </div>
                <div className="juv-trust-feature-item juv-anim-pop">
                  <div className="juv-trust-feature-icon"><Lock size={32} /></div>
                  <div className="juv-trust-feature-title">Secure Booking</div>
                  <div className="juv-trust-feature-desc">Safe and centralized payment system to protect your transactions.</div>
                </div>
                <div className="juv-trust-feature-item juv-anim-pop">
                  <div className="juv-trust-feature-icon"><Headphones size={32} /></div>
                  <div className="juv-trust-feature-title">24/7 Support</div>
                  <div className="juv-trust-feature-desc">Our dedicated team is ready to assist you before, during, and after your journey.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>



      {/* ================================================================
          TESTIMONIALS
          ================================================================ */}
      <RevealSection>
        <section className="juv-section" id="testimonials" style={{ background: 'white', maxWidth: '100%', borderTop: '1px solid var(--juv-border-soft)', borderBottom: '1px solid var(--juv-border-soft)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div className="juv-section-header juv-anim-child">
              <h2 className="juv-section-title">What Our Pilgrims Say</h2>
              <p className="juv-section-subtitle">Real reviews from verified pilgrims who traveled with our partner agencies</p>
            </div>



            <div className="juv-marquee-container juv-anim-child juv-delay-2">
              <div className="juv-marquee-track">
                {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                  <div key={`${t.id}-${idx}`} className="juv-testimonial-card">
                    <Quote className="juv-testimonial-quote-icon" size={64} />
                    <div className="juv-testimonial-header">
                      <img src={t.avatar} alt={t.name} className="juv-testimonial-avatar" loading="lazy" />
                      <div>
                        <div className="juv-testimonial-name">{t.name}</div>
                        <div className="juv-testimonial-pkg">{t.pkg} · {t.agency}</div>
                      </div>
                    </div>
                    <div className="juv-testimonial-stars">
                      {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= t.rating} />)}
                    </div>
                    <div className="juv-testimonial-quote">"{t.quote}"</div>
                    <div className="juv-testimonial-footer">
                      <span>{t.date}</span>
                      {t.verified && (
                        <span className="juv-testimonial-verified">
                          <BadgeCheck size={14} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ================================================================
          GUIDE SECTION
          ================================================================ */}
      <RevealSection>
        <section className="juv-section" id="guides" style={{ background: 'var(--juv-primary-soft)', maxWidth: '100%', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
          <div className="juv-guide-section-pattern"><IslamicPatternTeal /></div>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            <div className="juv-section-header-row juv-anim-child">
            <div className="juv-section-header" style={{ marginBottom: 0 }}>
              <h2 className="juv-section-title">Umrah & Hajj Guide</h2>
              <p className="juv-section-subtitle">Prepare for your sacred journey with expert guidance</p>
            </div>
            <button className="juv-btn juv-btn-text">View All {activeGuideTab} <IconArrowRight /></button>
          </div>
          
          <div className="juv-tabs-pills juv-anim-slide-right juv-delay-1" style={{ marginTop: '16px' }}>
            {['Guides', 'Articles'].map(tab => (
              <button 
                key={tab} 
                className={`juv-tab-pill ${activeGuideTab === tab ? 'active' : ''}`}
                onClick={() => setActiveGuideTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="juv-anim-child juv-delay-2" style={{ marginTop: '24px' }}>
            <div className="juv-guide-grid">
              {(activeGuideTab === 'Guides' ? [
                { title: 'Umrah Preparation Guide', desc: 'Essential steps to prepare for your Umrah journey including ihram, niyyah, and what to pack.', tag: 'Preparation', author: 'Ustaz Ahmad', readTime: '5 min read', thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80' },
                { title: 'Performing Umrah Step by Step', desc: 'Complete guide to performing Tawaf, Sa\'i, and other rituals of Umrah with detailed instructions.', tag: 'Ritual Guide', author: 'Dr. Fauzi', readTime: '12 min read', thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80' },
                { title: 'Makkah & Madinah Tips', desc: 'Practical tips for navigating the holy cities, local transport, weather, and nearby attractions.', tag: 'Travel Tips', author: 'Travel Expert', readTime: '8 min read', thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80' },
              ] : [
                { title: 'Understanding Umrah Rules and Miqat', desc: 'A complete Fiqh guide covering Ihram, Tawaf, Sa\'i, Tahallul, and Miqat boundaries.', tag: 'Umrah Fiqh', author: 'Ustaz Ali', readTime: '10 min read', thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80' },
                { title: 'Ziyarah Locations in Makkah & Madinah', desc: 'Historical places to visit during your pilgrimage, including Quba Mosque and Jabal Uhud.', tag: 'Haramain Info', author: 'Dr. Hasan', readTime: '7 min read', thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80' },
                { title: 'Latest Saudi Visa Requirements', desc: 'Step-by-step guide on passport preparation, vaccination, and the new electronic visa process.', tag: 'Documents & Visa', author: 'Admin', readTime: '4 min read', thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&q=80' },
                { title: 'Essential Packing List for First Timers', desc: 'Practical tips on what to bring, from comfortable footwear to personal health supplies.', tag: 'Practical Tips', author: 'Travel Expert', readTime: '6 min read', thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80' },
              ]).map((g, i) => (
                <div key={i} className="juv-guide-card">
                  <div className="juv-guide-img">
                    <img src={g.thumbnail} alt={g.title} loading="lazy" />
                    <span className="juv-guide-tag">{g.tag}</span>
                  </div>
                  <div className="juv-guide-content">
                    <div className="juv-guide-meta">
                      <span>{g.author}</span>
                      <span className="juv-guide-dot">•</span>
                      <span>{g.readTime}</span>
                    </div>
                    <div className="juv-guide-title">{g.title}</div>
                    <div className="juv-guide-desc">{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>
      </RevealSection>

      {/* ================================================================
          FAQ SECTION
          ================================================================ */}
      <RevealSection>
        <section className="juv-section" id="faq" style={{ background: 'var(--juv-surface-2)', maxWidth: '100%', borderTop: '1px solid var(--juv-border-soft)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div className="juv-section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="juv-section-title">Frequently Asked Questions</h2>
              <p className="juv-section-subtitle">Get answers to common questions about booking and pilgrimage</p>
            </div>

            <div className="juv-faq-layout">
              <div className="juv-faq-sidebar juv-anim-slide-left">
                {faqCategories.map(cat => (
                  <button 
                    key={cat.label}
                    className={`juv-faq-cat-btn ${activeFaqCategory === cat.label ? 'active' : ''}`}
                    onClick={() => { setActiveFaqCategory(cat.label); setActiveFaq(0); }}
                  >
                    <span className="juv-faq-cat-icon">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="juv-faq-list juv-anim-slide-right juv-delay-2">
                {faqData.filter(f => f.cat === activeFaqCategory).map((faq, i) => (
                  <div key={i} className={`juv-faq-item ${activeFaq === i ? 'active' : ''}`}>
                    <button className="juv-faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                      {faq.q}
                      <IconChevronDown />
                    </button>
                    <div className="juv-faq-answer">
                      <div className="juv-faq-answer-inner">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ================================================================
          CTA BANNER
          ================================================================ */}
      <RevealSection className="juv-cta-banner">
        <div className="juv-cta-banner-pattern"><IslamicPattern /></div>
        <div className="juv-cta-content juv-anim-scale-up">
          <h2 className="juv-cta-title">Ready to Begin Your Sacred Journey?</h2>
          <p className="juv-cta-subtitle">
            Compare packages from verified agencies and find the perfect Umrah or Hajj experience for you and your family.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="juv-btn juv-btn-white juv-btn-lg juv-cta-btn-glow">Search Packages <IconArrowRight /></button>
            <button className="juv-btn juv-btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              Contact Us
            </button>
          </div>
        </div>
      </RevealSection>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer className="juv-footer" id="contact">
        <div className="juv-footer-inner">
          <div className="juv-footer-grid">
            <div className="juv-footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img src="/brand/logo-full.svg" alt="UmrahHaji.com" style={{ height: '36px', filter: 'brightness(0) invert(1)' }} />
              </div>
              <p>The trusted platform for Umrah and Hajj package discovery. Compare verified agencies, transparent pricing, and book your sacred journey with confidence.</p>
              <div className="juv-footer-social" style={{ marginTop: '16px' }}>
                <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 16V8.5H4V6h2.5V4c0-2.1 1.3-3.5 3.4-3.5 1 0 1.6.1 1.6.1v2h-1c-.9 0-1.3.7-1.3 1.4v2h2.2l-.3 2.5H9.2V16" /></svg></a>
                <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.2" /><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" /><circle cx="12" cy="4" r="1" fill="currentColor" /></svg></a>
                <a href="#" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6 1h2.4L10 6.6 16 15h-4.6l-3.5-4.6L4 15H1.6l5.3-6L1 1h4.7l3.2 4.2L12.6 1zM11.8 13.5h1.3L4.3 2.4H2.9l8.9 11.1z" /></svg></a>
                <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.5 4.5s-.2-1.3-.7-1.8C13.1 2 12.3 2 12 2H4c-.3 0-1.1 0-1.8.7-.5.5-.7 1.8-.7 1.8S1.3 6 1.3 7.5v1c0 1.5.2 3 .2 3s.2 1.3.7 1.8c.7.7 1.5.7 1.8.7h8c.3 0 1.1 0 1.8-.7.5-.5.7-1.8.7-1.8s.2-1.5.2-3v-1c0-1.5-.2-3-.2-3zM6.5 10V6l4 2-4 2z" /></svg></a>
              </div>
            </div>
            <div>
              <h4 className="juv-footer-heading">Packages</h4>
              <div className="juv-footer-links">
                <button className="juv-footer-link">Umrah Packages</button>
                <button className="juv-footer-link">Hajj Packages</button>
                <button className="juv-footer-link">Family Packages</button>
                <button className="juv-footer-link">Muslim Trip</button>
                <button className="juv-footer-link">Promo & Offers</button>
              </div>
            </div>
            <div>
              <h4 className="juv-footer-heading">Company</h4>
              <div className="juv-footer-links">
                <button className="juv-footer-link">About Us</button>
                <button className="juv-footer-link">Travel Partner</button>
                <button className="juv-footer-link">Articles</button>
                <button className="juv-footer-link">Testimonials</button>
                <button className="juv-footer-link">Contact Us</button>
              </div>
            </div>
            <div>
              <h4 className="juv-footer-heading">Support</h4>
              <div className="juv-footer-links">
                <button className="juv-footer-link">FAQ</button>
                <button className="juv-footer-link">Guide</button>
                <button className="juv-footer-link">Terms & Conditions</button>
                <button className="juv-footer-link">Privacy Policy</button>
              </div>
            </div>
          </div>

          <div className="juv-footer-bottom">
            <span>© 2026 UmrahHaji.com. All rights reserved.</span>
            <span style={{ fontSize: '12px', opacity: 0.5 }}>Trusted by 25,000+ pilgrims across Malaysia</span>
          </div>
        </div>
      </footer>

      {/* ================================================================
          MOBILE BOTTOM NAV
          ================================================================ */}
      <nav className="juv-bottom-nav">
        <button className="juv-bottom-nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <IconHome /> Home
        </button>
        <button className="juv-bottom-nav-item" onClick={() => scrollToSection('packages')}>
          <IconPackages /> Packages
        </button>
        <button className="juv-bottom-nav-item" onClick={() => alert('Please login to access My Trip')}>
          <IconTrip /> My Trip
        </button>
        <button className="juv-bottom-nav-item" onClick={() => scrollToSection('guides')}>
          <IconGuide /> Guides
        </button>
        <button className="juv-bottom-nav-item" onClick={() => isAuthenticated ? setProfileOpen(!profileOpen) : alert('Please login to access your profile')}>
          {isAuthenticated ? (
            <img src="https://i.pravatar.cc/100?img=11" alt="Profile" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', marginBottom: '4px' }} />
          ) : (
            <IconProfile />
          )}
          Profile
        </button>
      </nav>

      {/* Removed Admin Switch Pill */}

      {/* Bottom spacing for mobile nav */}
      <div style={{ height: '72px' }} className="juv-bottom-nav-spacer" />
      <style>{`.juv-bottom-nav-spacer { display: block; } @media (min-width: 1024px) { .juv-bottom-nav-spacer { display: none; } }`}</style>
    </div>
  );
};
