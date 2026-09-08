'use client';

import { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Car,
  Hotel,
  Star,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2,
  Plane,
  CreditCard,
  QrCode,
  Utensils,
  Sparkle,
  PhoneCall,
  AlertTriangle,
  ChevronRight,
  X,
  Compass,
  LayoutDashboard,
  Receipt,
  Navigation,
  ExternalLink,
  Crown,
  Wine,
  Gem,
  KeyRound,
  Lock,
  Zap,
  Globe,
  Check,
  HelpCircle,
  Building2,
  Building,
  Home,
  CheckCircle,
  Send,
  SlidersHorizontal,
  Luggage,
  Mountain,
  Tag,
  Percent,
} from 'lucide-react';
import { HorizontalLogo, LogoOnDark, StackedLogo, AppIcon, EmblemImageLogo } from '@staysphere/ui-kit';
import { PartnerRegistrationModal } from '../components/PartnerRegistrationModal';
import { MyJourneyView } from '../components/MyJourneyView';
import { ProactiveResolveSentinel } from '../components/ProactiveResolveSentinel';

interface VillaCategory {
  name: string;
  price: number;
  description: string;
  curatedPerks: string[];
}

interface LuxuryEstate {
  id: string;
  name: string;
  location: string;
  destinationCity: string;
  category: 'coastal' | 'palace' | 'chalet' | 'apartment';
  propertyTypeLabel: string;
  rating: number;
  reviewCount: number;
  trustScore: number;
  pricePerNight: number;
  image: string;
  tagline: string;
  description: string;
  exclusiveInclusions: string[];
  villas: VillaCategory[];
  defaultAirport: string;
}

interface SightseeingPackage {
  id: string;
  name: string;
  destinationCity: string;
  duration: string;
  price: number;
  tagline: string;
  highlights: string[];
  includedVehicle: string;
  badge: string;
}

const SIGHTSEEING_CATALOG: SightseeingPackage[] = [
  // GOA
  {
    id: 'goa-boat',
    name: 'Private Sunset Speedboat Cruise & Beach Tour',
    destinationCity: 'Goa',
    duration: '4 Hours (4:00 PM – 8:00 PM)',
    price: 4800,
    tagline: 'Private 32ft chartered speedboat along Sinquerim & Morjim waters with sunset champagne.',
    highlights: [
      'Private 32ft twin-engine luxury speedboat',
      'Sunset champagne & fresh Goan canapés',
      'Dolphin spotting & Morjim sandbar anchor',
      'Chauffeured pickup from hotel lobby',
    ],
    includedVehicle: 'Mercedes-Maybach Transfer + Luxury Speedboat',
    badge: 'Most Popular in Goa',
  },
  {
    id: 'goa-heritage',
    name: 'Old Goa UNESCO Heritage & Spice Farm Safari',
    destinationCity: 'Goa',
    duration: '6 Hours (9:30 AM – 3:30 PM)',
    price: 3500,
    tagline: 'Centuries-old cathedrals, authentic Goan spice plantation walk, and organic buffet lunch.',
    highlights: [
      'Basilica of Bom Jesus & Se Cathedral guided tour',
      'Sahakari Spice Farm traditional buffet lunch',
      'Botanical plantation walk with expert naturalist',
      'Private air-conditioned luxury ride throughout',
    ],
    includedVehicle: 'Mercedes-Benz Luxury Chauffeur',
    badge: 'Cultural Pick',
  },
  {
    id: 'goa-nightlife',
    name: 'North Goa Beach Club & Sunset Lounge Tour',
    destinationCity: 'Goa',
    duration: '5 Hours (5:30 PM – 10:30 PM)',
    price: 3200,
    tagline: 'VIP table reservations at Vagator & Anjuna beachfront lounges with dedicated standby cab.',
    highlights: [
      'VIP table reservations at top cliffside sunset lounges',
      'Dedicated standby chauffeur for zero-wait transit',
      'Scenic coastal evening drive',
      'On-call concierge assistance for night access',
    ],
    includedVehicle: 'Maybach S680 Standby Chauffeur',
    badge: 'Nightlife & Dining',
  },

  // UDAIPUR
  {
    id: 'udr-palace',
    name: 'Lake Pichola Solar Boat & City Palace Royal Tour',
    destinationCity: 'Udaipur',
    duration: '4.5 Hours (10:00 AM – 2:30 PM)',
    price: 5200,
    tagline: 'Private solar boat to Jagmandir Island with skip-the-line royal City Palace historian guide.',
    highlights: [
      'Private chartered royal solar boat across Lake Pichola',
      'Skip-the-line City Palace royal historian guide',
      'Mewari royal high tea at sunset terrace',
      'Handcrafted souvenir & heritage artisan walk',
    ],
    includedVehicle: 'Private Solar Boat + Heritage Chauffeur',
    badge: 'Royal Signature',
  },
  {
    id: 'udr-fort',
    name: 'Kumbhalgarh Fortress & Sunset 4x4 Safari',
    destinationCity: 'Udaipur',
    duration: '7 Hours (1:00 PM – 8:00 PM)',
    price: 4200,
    tagline: 'Explore the 36km Great Wall of India fortress with a scenic Aravalli mountain safari.',
    highlights: [
      'UNESCO World Heritage Kumbhalgarh 36km wall tour',
      'Panoramic Aravalli Mountain 4x4 chauffeur drive',
      'Royal sunset picnic lunch prepared by palace chef',
      'Scenic viewpoint champagne stop',
    ],
    includedVehicle: 'Land Rover Defender 4x4',
    badge: 'Adventure Safari',
  },
  {
    id: 'udr-cultural',
    name: 'Bagore Ki Haveli Folk Show & Old Bazaar Trail',
    destinationCity: 'Udaipur',
    duration: '3.5 Hours (6:00 PM – 9:30 PM)',
    price: 2900,
    tagline: 'Reserved front-row Rajasthani folk dance at historic haveli followed by old silver bazaar trail.',
    highlights: [
      'Reserved VIP front-row Dharohar folk dance show',
      'Jagdish Temple & Old City silver artisan trail',
      'Traditional sweet tasting & puppet art demo',
      'Chauffeured pickup and return to palace hotel',
    ],
    includedVehicle: 'Luxury Electric Sedan',
    badge: 'Heritage & Art',
  },

  // MANALI
  {
    id: 'manali-snow',
    name: 'Solang Valley & Atal Tunnel 4x4 Snow Adventure',
    destinationCity: 'Manali',
    duration: '6 Hours (9:00 AM – 3:00 PM)',
    price: 4500,
    tagline: 'High-altitude snow adventure at 10,000 ft with snow scooter pass and heated 4x4 Defender.',
    highlights: [
      'Atal Tunnel North Portal high-altitude snow drive',
      'Snow scooter & private cable car adventure pass',
      'Fireside mountain lunch & hot saffron kahwa',
      'All thermal gear, boots & snow jackets included',
    ],
    includedVehicle: 'Heated Land Rover Defender 4x4',
    badge: 'Top Winter Pick',
  },
  {
    id: 'manali-heritage',
    name: 'Naggar Castle & Organic Apple Orchard Trail',
    destinationCity: 'Manali',
    duration: '4.5 Hours (10:30 AM – 3:00 PM)',
    price: 2800,
    tagline: '15th-century timber castle, Roerich Himalayan art gallery, and organic apple orchard lunch.',
    highlights: [
      '15th-century medieval wooden Naggar Castle tour',
      'Nicholas Roerich Himalayan Art Gallery exploration',
      'Organic apple orchard walk with fresh pressed cider',
      'Authentic Himachali Siddu & local cuisine tasting',
    ],
    includedVehicle: 'Mercedes Luxury Mountain SUV',
    badge: 'Scenic Mountain Trail',
  },
  {
    id: 'manali-glacier',
    name: 'Rohtang Pass High-Altitude Glacier Expedition',
    destinationCity: 'Manali',
    duration: '8 Hours (7:00 AM – 3:00 PM)',
    price: 5500,
    tagline: 'Climb to 13,058 ft Rohtang glacier with a certified high-altitude mountain guide.',
    highlights: [
      'Climb to 13,058 ft panoramic glacier peak',
      'Certified high-altitude mountain guide & safety kit',
      'Hot thermos herbal tea & fresh packed chef lunch',
      'Zero-delay national park permit pre-approved',
    ],
    includedVehicle: '4x4 Expedition Defender',
    badge: 'Epic Expedition',
  },

  // MUMBAI
  {
    id: 'bom-heritage',
    name: 'South Bombay Heritage Drive & Marine Drive Tour',
    destinationCity: 'Mumbai',
    duration: '4 Hours (4:00 PM – 8:00 PM)',
    price: 3200,
    tagline: 'Gateway of India, Victoria Terminus, Colaba art quarter, and Queen’s Necklace sunset cruise.',
    highlights: [
      'Gateway of India & Taj Mahal Palace photo stop',
      'Victoria Terminus & Kala Ghoda art quarter tour',
      'Queen’s Necklace sunset drive in Maybach S680',
      'Chauffeured drop at Sea Lounge for heritage high tea',
    ],
    includedVehicle: 'Mercedes-Maybach S680',
    badge: 'Iconic City Drive',
  },
  {
    id: 'bom-elephanta',
    name: 'Elephanta Island UNESCO Caves Speedboat Safari',
    destinationCity: 'Mumbai',
    duration: '5 Hours (9:00 AM – 2:00 PM)',
    price: 4000,
    tagline: 'Private chartered speedboat from Gateway with an archaeological guide for 6th-century caves.',
    highlights: [
      'Private chartered catamaran/speedboat from Gateway',
      'Archaeological guide for 6th-century rock-cut caves',
      'Fresh coconut refreshments on return cruise',
      'Seamless chauffeur pickup and drop at penthouse',
    ],
    includedVehicle: 'Private Speedboat + Luxury Cab',
    badge: 'UNESCO Safari',
  },
  {
    id: 'bom-culinary',
    name: 'Bespoke Designer Boutiques & Fine Dining Trail',
    destinationCity: 'Mumbai',
    duration: '5 Hours (2:00 PM – 7:00 PM)',
    price: 4500,
    tagline: 'VIP shopping trail through Bandra & Kala Ghoda designer ateliers with reserved fine dining.',
    highlights: [
      'Private VIP preview at top Indian designer ateliers',
      'Artisan coffee & gourmet tasting pitstops',
      'Priority table reservation at Mumbai top restaurant',
      'Standby chauffeur with in-car concierge assistance',
    ],
    includedVehicle: 'Maybach S680 Luxury Chauffeur',
    badge: 'Luxury Lifestyle',
  },
];

const PROPERTIES: LuxuryEstate[] = [
  {
    id: 'estate-1',
    name: 'The Grand Vagator Bay Resort & Oceanfront Villas',
    location: 'Vagator Cliff, North Goa',
    destinationCity: 'Goa',
    category: 'coastal',
    propertyTypeLabel: 'Luxury Beach Resort & Private Villas',
    rating: 4.98,
    reviewCount: 128,
    trustScore: 99.8,
    pricePerNight: 42000,
    image: '/brand/ocean_villa.jpg',
    tagline: '5-Star Beachfront Luxury Resort with Private Cliffside Pool Villas',
    description: 'A world-class beachfront resort perched on the iconic Vagator cliffs. Offers luxury oceanfront resort suites and private pool villas, with 3 signature restaurants, an infinity cliff pool, private sunset sundecks, and dedicated personal butler care.',
    defaultAirport: 'Manohar International Airport MOPA / GOI Dabolim (GOX/GOI)',
    exclusiveInclusions: [
      'Mercedes-Maybach Airport Pickup & Drop',
      '24/7 Dedicated In-Stay Butler',
      'Private Sunset Infinity Pool & Resort Spa',
      'Fresh Seafood Barbecue by Master Chef',
    ],
    villas: [
      {
        name: 'Deluxe Oceanfront Resort Suite (1,400 sq.ft)',
        price: 28000,
        description: 'Spacious sea-view suite with private balcony, deep soaking marble bathtub, and daily resort breakfast.',
        curatedPerks: ['Daily Champagne Breakfast', 'Resort Spa Access', 'Airport Chauffeur Included'],
      },
      {
        name: 'The Horizon Private Pool Villa (3,800 sq.ft)',
        price: 42000,
        description: 'Direct panoramic sea views, private heated infinity pool, outdoor rain shower, and king master suite.',
        curatedPerks: ['Private Heated Pool', 'Complimentary In-Villa Dining', 'Dedicated Chauffeur on Standby'],
      },
      {
        name: 'The Royal Cliff Presidential Villa (6,200 sq.ft)',
        price: 78000,
        description: 'Double-level private estate with private beach path, 4 master suites, and dedicated personal butler team.',
        curatedPerks: ['Private Speedboat Sunset Cruise', 'All Meals & Chef Dining Included', 'Full Chauffeur Fleet on Standby'],
      },
    ],
  },
  {
    id: 'estate-2',
    name: 'The Royal Lake Pichola Heritage Palace Hotel',
    location: 'Lake Pichola, Udaipur, Rajasthan',
    destinationCity: 'Udaipur',
    category: 'palace',
    propertyTypeLabel: '5-Star Heritage Palace Hotel',
    rating: 4.99,
    reviewCount: 210,
    trustScore: 99.9,
    pricePerNight: 65000,
    image: '/brand/royal_palace.jpg',
    tagline: 'Historic Island Palace Hotel with Private Solar Boat Access & Royal Dining',
    description: 'Live like royalty in India’s most celebrated heritage island palace hotel. Arrive via private royal solar boat, dine under hand-painted gold leaf ceilings, and experience authentic royal Rajasthani hospitality with live classical sitar music.',
    defaultAirport: 'Maharana Pratap Airport Udaipur (UDR)',
    exclusiveInclusions: [
      'Private Royal Solar Boat Arrival & Transfer',
      'Personal Heritage Guide & Royal Butler',
      'Grand Royal Thali Dinner by Master Chefs',
      '24/7 In-Suite Refreshments & High Tea',
    ],
    villas: [
      {
        name: 'Palace Heritage Grand Room (950 sq.ft)',
        price: 38000,
        description: 'Authentic Mewari artwork, lake view marble arches, luxury king bed, and round-the-clock room service.',
        curatedPerks: ['Royal Welcome Ceremony', 'Solar Boat Transfer', 'Complimentary High Tea'],
      },
      {
        name: 'Maharaja Grand Jharokha Suite (2,400 sq.ft)',
        price: 65000,
        description: 'Overlooking the illuminated City Palace with marble soaking bathtub, antique brass fittings, and private jharokha balcony.',
        curatedPerks: ['Private Royal Boat Ride', 'Sommelier Cellar Access', 'Private Sitar Performance'],
      },
      {
        name: 'The Royal Island Pavilion (5,000 sq.ft)',
        price: 115000,
        description: 'Exclusive private wing with 360-degree lake views, private garden courtyard, and round-the-clock personal care.',
        curatedPerks: ['Helicopter Landing Coordination', 'Unlimited Royal Dining', 'Personal Butler & Security'],
      },
    ],
  },
  {
    id: 'estate-3',
    name: 'The Alpine Snow Peak Resort & Glass Chalets',
    location: 'Solang Heights, Manali, Himachal Pradesh',
    destinationCity: 'Manali',
    category: 'chalet',
    propertyTypeLabel: 'Luxury Mountain Resort & Chalets',
    rating: 4.97,
    reviewCount: 96,
    trustScore: 99.4,
    pricePerNight: 36000,
    image: '/brand/alpine_chalet.jpg',
    tagline: 'Heated Luxury Mountain Resort with 360° Himalayan Snow Views',
    description: 'An iconic alpine resort and pine wood glass chalets at 8,500 ft. Features cedarwood outdoor heated jacuzzis, floor-to-ceiling glass ceilings for stargazing, warm wood fireplaces, all-day multi-cuisine dining, and mountain adventure guides.',
    defaultAirport: 'Bhuntar / Kullu-Manali Airport (KUU) / Chandigarh (IXC)',
    exclusiveInclusions: [
      'Land Rover Defender 4x4 Mountain Chauffeur',
      'Outdoor Heated Hydrotherapy Hot Tub',
      'Fireside Barbecue & Warm Drinks Evening',
      'Local Sightseeing & Snow Trek Guide',
    ],
    villas: [
      {
        name: 'Alpine Forest View Resort Suite (1,100 sq.ft)',
        price: 24000,
        description: 'Pine wood paneling, private balcony with valley views, heated floors, and hot beverage bar.',
        curatedPerks: ['Hot Buffet Breakfast', 'Heated Jacuzzi Access', 'Mountain Chauffeur'],
      },
      {
        name: 'The Glass Horizon Alpine Suite (1,800 sq.ft)',
        price: 36000,
        description: 'Panoramic glass walls with snow peak views, open wood fireplace, cedar hot tub, and goose-down king bed.',
        curatedPerks: ['Daily Hot Mountain Breakfast', '4x4 Mountain Car Included', 'Nightly Stargazing Telescope'],
      },
      {
        name: 'The Royal Rohtang Presidential Chalet (4,200 sq.ft)',
        price: 58000,
        description: 'Full two-storey standalone chalet with heated indoor plunge pool, sauna, and dedicated mountain butler.',
        curatedPerks: ['All Meals & Warm Beverages Included', 'Scenic Mountain Tour', 'Private Campfire & Barbecue'],
      },
    ],
  },
  {
    id: 'estate-4',
    name: 'The Horizon Sea-View Luxury Penthouse & Serviced Suites',
    location: 'Bandra West, Mumbai',
    destinationCity: 'Mumbai',
    category: 'apartment',
    propertyTypeLabel: 'Luxury Serviced Apartments & Penthouse',
    rating: 4.98,
    reviewCount: 142,
    trustScore: 99.7,
    pricePerNight: 48000,
    image: '/brand/chauffeur_transit.jpg',
    tagline: 'Ultra-Luxury 3-Floor Serviced Penthouse with Private Rooftop Pool',
    description: 'Ultra-luxury serviced penthouse and executive suites located high above Bandra West with Arabian Sea views. Features a private infinity plunge pool, personal chef, 24/7 executive security, and chauffeured Maybach city rides.',
    defaultAirport: 'Chhatrapati Shivaji Maharaj International Airport Mumbai (BOM T2)',
    exclusiveInclusions: [
      'Mercedes-Maybach S680 Standby Chauffeur',
      'Private High-Rise Heated Plunge Pool',
      'Gourmet Chef Dining & Fresh Refreshments',
      'Private Direct Elevator Access',
    ],
    villas: [
      {
        name: 'Executive 2-Bedroom Serviced Suite (1,600 sq.ft)',
        price: 32000,
        description: 'Fully serviced luxury apartment with modern kitchen, Italian marble bath, high-speed Wi-Fi, and daily housekeeping.',
        curatedPerks: ['Daily Gourmet Breakfast', 'Airport Luxury Pickup', '24/7 Concierge'],
      },
      {
        name: 'The Celestial Oceanview Penthouse (3,200 sq.ft)',
        price: 48000,
        description: 'High ceilings with floor-to-ceiling sea view glass, Italian marble bathroom, and modern chef kitchen.',
        curatedPerks: ['Daily Gourmet Breakfast & Brunch', 'Chauffeured Maybach City Access', 'Private Butler'],
      },
      {
        name: 'The Grand Sovereign Sky Residence (7,000 sq.ft)',
        price: 92000,
        description: 'Three-floor private penthouse with rooftop deck, 12-seat private home theatre, and full personal chef team.',
        curatedPerks: ['Full In-House Chef Team', 'Airport Chauffeur Pickup', 'Unlimited Gourmet Snacks & Drinks'],
      },
    ],
  },
];

export default function GuestApp() {
  const [activeTab, setActiveTab] = useState<'landing' | 'explore' | 'booking' | 'myjourney' | 'resolve'>('landing');
  const [showResolveModal, setShowResolveModal] = useState<boolean>(false);
  const [resolveCategory, setResolveCategory] = useState<string>('GENERAL_INQUIRY');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchDestination, setSearchDestination] = useState<string>('Goa');
  const [searchPropertyType, setSearchPropertyType] = useState<string>('all');

  const [selectedEstate, setSelectedEstate] = useState<LuxuryEstate>(PROPERTIES[0]);
  const [selectedVilla, setSelectedVilla] = useState<string>(PROPERTIES[0].villas[0].name);
  const [nights, setNights] = useState<number>(3);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState<string>('2026-09-12');
  
  // Transit & Sightseeing Selection
  const [transitMode, setTransitMode] = useState<'roundtrip' | 'pickup_only' | 'drop_only' | 'none'>('roundtrip');
  const [transferVehicle, setTransferVehicle] = useState<'maybach' | 'defender' | 'electric'>('maybach');
  const [arrivalFlightNumber, setArrivalFlightNumber] = useState<string>('6E-204');
  const [departureFlightNumber, setDepartureFlightNumber] = useState<string>('AI-678');
  const [selectedSightseeingIds, setSelectedSightseeingIds] = useState<string[]>(['goa-boat']);

  // Offers & Promo Codes
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; name: string } | null>({
    code: 'STAYSPHERE2026',
    discountPercent: 10,
    name: 'Grand Welcome 10% Off',
  });
  const [promoMessage, setPromoMessage] = useState<string>('Promo STAYSPHERE2026 active (10% Off)');

  // Booking Flow Steps & Radar
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('SS-LUX-8492');
  const [activeRadarLeg, setActiveRadarLeg] = useState<'pickup' | 'stay' | 'sightseeing' | 'drop'>('pickup');

  // Butler & Food Ordering Mock States
  const [butlerMessages, setButlerMessages] = useState<Array<{ sender: 'user' | 'butler'; text: string; time: string }>>([
    { sender: 'butler', text: 'Namaste & Welcome! I am Chef Raghav, your dedicated 24/7 Butler. Your welcome champagne is chilled and ready. How may I assist you today?', time: '14:02' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [roomTemp, setRoomTemp] = useState(22);
  const [lightsMode, setLightsMode] = useState<'Relax' | 'Romantic' | 'Bright' | 'Night'>('Relax');

  // Partner Registration Modal State
  const [showPartnerModal, setShowPartnerModal] = useState<boolean>(false);

  // Active destination's sightseeing tours
  const currentDestination = selectedEstate ? selectedEstate.destinationCity : 'Goa';
  const availableSightseeing = SIGHTSEEING_CATALOG.filter(
    (item) => item.destinationCity.toLowerCase() === currentDestination.toLowerCase()
  );

  // Pricing calculations
  const currentVillaPrice = selectedEstate
    ? (selectedEstate.villas.find((v) => v.name === selectedVilla)?.price || selectedEstate.pricePerNight)
    : 42000;
  
  const staySubtotal = currentVillaPrice * nights;

  // Vehicle pricing per leg
  const vehiclePricePerLeg = transferVehicle === 'maybach' ? 4500 : transferVehicle === 'defender' ? 3800 : 2800;
  
  const pickupCost = transitMode === 'roundtrip' || transitMode === 'pickup_only' ? vehiclePricePerLeg : 0;
  const dropCost = transitMode === 'roundtrip' || transitMode === 'drop_only' ? vehiclePricePerLeg : 0;
  
  // Sightseeing sum
  const sightseeingCost = selectedSightseeingIds.reduce((sum, id) => {
    const tour = SIGHTSEEING_CATALOG.find((t) => t.id === id);
    return sum + (tour ? tour.price : 0);
  }, 0);

  // Roundtrip & Bundle discount
  const bundleDiscount = transitMode === 'roundtrip' && selectedSightseeingIds.length > 0 ? 1500 : 0;
  const travelSubtotal = pickupCost + dropCost + sightseeingCost - bundleDiscount;

  const rawTotal = staySubtotal + travelSubtotal;
  const promoDiscountAmount = appliedPromo ? Math.round((rawTotal * appliedPromo.discountPercent) / 100) : 0;
  const subtotalAfterDiscount = rawTotal - promoDiscountAmount;

  const luxuryTaxes = Math.round(subtotalAfterDiscount * 0.12);
  const totalBill = subtotalAfterDiscount + luxuryTaxes;

  const navigateToTab = (
    tab: 'landing' | 'explore' | 'booking' | 'myjourney' | 'resolve',
    step: 1 | 2 | 3 = 1,
    estate?: LuxuryEstate
  ) => {
    if (estate) {
      setSelectedEstate(estate);
      setSelectedVilla(estate.villas[0]?.name || '');
      const cityTours = SIGHTSEEING_CATALOG.filter((t) => t.destinationCity.toLowerCase() === estate.destinationCity.toLowerCase());
      if (cityTours.length > 0) {
        setSelectedSightseeingIds([cityTours[0].id]);
      } else {
        setSelectedSightseeingIds([]);
      }
    }
    setBookingStep(step);
    setBookingConfirmed(false);
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartBooking = (estate: LuxuryEstate) => {
    navigateToTab('booking', 1, estate);
  };

  const handleToggleSightseeing = (id: string) => {
    if (selectedSightseeingIds.includes(id)) {
      setSelectedSightseeingIds(selectedSightseeingIds.filter((item) => item !== id));
    } else {
      setSelectedSightseeingIds([...selectedSightseeingIds, id]);
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'MONSOON20' || code === 'ROYAL20') {
      setAppliedPromo({ code, discountPercent: 20, name: 'Special 20% Privilege Offer' });
      setPromoMessage(`Coupon "${code}" applied! You saved 20%.`);
    } else if (code === 'STAYSPHERE2026' || code === 'WELCOME10') {
      setAppliedPromo({ code, discountPercent: 10, name: 'Welcome 10% Offer' });
      setPromoMessage(`Coupon "${code}" applied! You saved 10%.`);
    } else if (code === 'MAYBACHFREE') {
      setAppliedPromo({ code, discountPercent: 15, name: 'Complimentary Chauffeur Upgrade (15% Off)' });
      setPromoMessage(`Coupon "${code}" applied! Enjoy 15% off total stay.`);
    } else {
      setPromoMessage('Invalid coupon code. Try "MONSOON20" or "STAYSPHERE2026"');
    }
  };

  const handleCompleteBooking = () => {
    setBookingConfirmed(true);
    setConfirmedBookingId(`SS-LUX-${Math.floor(1000 + Math.random() * 9000)}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { sender: 'user' as const, text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setButlerMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setButlerMessages((prev) => [
        ...prev,
        {
          sender: 'butler',
          text: 'Certainly! Your request has been acknowledged and is being handled immediately with utmost priority.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  const handleOrderDining = (item: string) => {
    setOrderedItems((prev) => [...prev, item]);
    setButlerMessages((prev) => [
      ...prev,
      {
        sender: 'butler',
        text: `Your order for "${item}" has been sent to the Executive Chef. It will be served hot in your suite in 20 minutes.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };


  return (
    <div className="min-h-screen bg-[#001428] text-slate-100 flex flex-col font-sans selection:bg-[#FF8A3D] selection:text-white">
      {/* Top Application Switcher Bar */}
      <div className="bg-[#000B17] border-b border-white/10 px-4 sm:px-8 py-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-slate-300 min-w-0">
          <Compass className="w-3.5 h-3.5 text-[#00D2C4] shrink-0" />
          <span className="truncate sm:whitespace-normal">StaySphere Journey Platform: <strong className="text-white">Coordinated Stays, Mobility & Proactive Resolution</strong></span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowPartnerModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#002B4D] border border-[#00A9A5]/40 text-[#00D2C4] font-bold hover:brightness-110 text-xs shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span>Partner & Operations Network ↗</span>
          </button>
        </div>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#001830]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="w-full flex items-center justify-between gap-3">
          {/* Logo & Main Navigation - Left Aligned */}
          <div className="flex items-center gap-4 lg:gap-6 min-w-0">
            <div
              onClick={() => navigateToTab('landing')}
              className="cursor-pointer shrink-0"
            >
              <HorizontalLogo size="sm" variant="dark" />
            </div>

            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => navigateToTab('landing')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'landing'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('explore')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'explore'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Hotel className="w-3.5 h-3.5 text-[#00D2C4] shrink-0" />
                <span>1. Stays & Itineraries</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('booking', 1)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'booking'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#FF8A3D] shrink-0" />
                <span>2. Book Unified Journey</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('myjourney')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'myjourney'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Navigation className="w-3.5 h-3.5 text-[#3CCF91] shrink-0" />
                <span>3. My Journey (Live Timeline)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setResolveCategory('GENERAL_INQUIRY');
                  setShowResolveModal(true);
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer bg-[#FF8A3D]/15 hover:bg-[#FF8A3D]/25 border border-[#FF8A3D]/40 text-[#FFC857]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF8A3D] shrink-0" />
                <span>4. Resolve (15-Min SLA)</span>
              </button>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowPartnerModal(true)}
              className="hidden md:flex px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FFC857]/20 to-[#FF8A3D]/20 hover:from-[#FFC857]/30 hover:to-[#FF8A3D]/30 border border-[#FFC857]/40 text-[#FFC857] text-xs font-black transition-all items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span>Partner With Us</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToTab('booking', 1)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Book Trip</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: LANDING & DISCOVERY PAGE                                           */}
        {/* ========================================================================= */}
        {activeTab === 'landing' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden glass-panel-luxury p-8 sm:p-14 lg:p-16 text-center space-y-7 shadow-2xl">
              {/* Subtle ambient gold radial background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,184,105,0.15),transparent_60%)] pointer-events-none" />
              
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002B4D]/90 border border-[#E5B869]/40 text-[#F3CA7E] text-xs font-bold uppercase tracking-widest shadow-lg">
                <Crown className="w-3.5 h-3.5 text-[#FFC857]" />
                <span>The Sovereign Journey Platform</span>
              </div>

              <h1 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
                Curated Luxury Stays, Executive Transit & Local Excursions. <br />
                <span className="gold-text-gradient italic font-normal">
                  Synchronized End-to-End with Custody Protection.
                </span>
              </h1>

              <p className="relative z-10 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                Discover bespoke clifftop villas, heritage island palaces, alpine glass chalets, and sea-view penthouses across Goa, Udaipur, Manali, and Mumbai—seamlessly linked with verified chauffeur transfers, private charters, and proactive 15-minute SLA resolution.
              </p>

              {/* Special Seasonal Promo Banner */}
              <div className="relative z-10 max-w-3xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#002B4D] via-[#001E38] to-[#001428] border border-[#E5B869]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left shadow-xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFC857] to-[#FF8A3D] text-[#001428] font-black flex items-center justify-center shadow-md shrink-0">
                    <Tag className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-white flex flex-wrap items-center gap-1.5">
                      <span>Monsoon Privilege Offer: Code "MONSOON20"</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] text-[10px] font-bold border border-[#FFC857]/30 whitespace-nowrap shrink-0">VIP EXCLUSIVE</span>
                    </div>
                    <span className="text-[11px] text-slate-300 block mt-0.5">Enjoy 20% Off Stays + Complimentary Airport Chauffeur Upgrade</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedPromo({ code: 'MONSOON20', discountPercent: 20, name: 'Special 20% Privilege Offer' });
                    setPromoMessage('Coupon "MONSOON20" applied! You saved 20%.');
                    navigateToTab('booking', 1, PROPERTIES[0]);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFC857] to-[#FF8A3D] text-[#001428] font-black text-xs hover:brightness-110 shrink-0 cursor-pointer shadow-lg shadow-[#FF8A3D]/25 transition whitespace-nowrap text-center"
                >
                  Apply & Book
                </button>
              </div>

              {/* Quick Search & Filter Bar */}
              <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#030D1A]/95 border border-[#E5B869]/30 backdrop-blur-2xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
                <div>
                  <label className="text-[11px] font-bold text-[#F3CA7E] uppercase tracking-wider block mb-1">
                    Destination
                  </label>
                  <select
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#06182F] border border-white/10 text-white font-bold text-xs outline-none focus:border-[#E5B869] cursor-pointer"
                  >
                    <option value="Goa">Goa (Beach Resorts & Villas)</option>
                    <option value="Udaipur">Udaipur (Palace Hotels)</option>
                    <option value="Manali">Manali (Snow Chalets)</option>
                    <option value="Mumbai">Mumbai (Serviced Penthouses)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#F3CA7E] uppercase tracking-wider block mb-1">
                    Stay Category
                  </label>
                  <select
                    value={searchPropertyType}
                    onChange={(e) => setSearchPropertyType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#06182F] border border-white/10 text-white font-bold text-xs outline-none focus:border-[#E5B869] cursor-pointer"
                  >
                    <option value="all">All Stays (Hotels & Villas)</option>
                    <option value="hotel">5-Star Luxury Hotels</option>
                    <option value="resort">Beachfront & Mountain Resorts</option>
                    <option value="apartment">Serviced Luxury Suites</option>
                    <option value="villa">Private Pool Villas</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#F3CA7E] uppercase tracking-wider block mb-1">
                    Dates & Nights
                  </label>
                  <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-[#06182F] border border-white/10 text-white text-xs font-bold">
                    <Calendar className="w-3.5 h-3.5 text-[#00D2C4] shrink-0" />
                    <span className="whitespace-nowrap">Sep 12 – 15 (3 Nights)</span>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      const matched = PROPERTIES.find((p) => p.destinationCity.toLowerCase() === searchDestination.toLowerCase()) || PROPERTIES[0];
                      navigateToTab('booking', 1, matched);
                    }}
                    className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#E5B869] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Search & Book Trip</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" /> Milestone Custody Protection
                </span>
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <Plane className="w-4 h-4 text-[#00D2C4] shrink-0" /> Flight-Synced Airport Chauffeurs
                </span>
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <Compass className="w-4 h-4 text-[#FF8A3D] shrink-0" /> Curated Excursions & Private Yachts
                </span>
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <Clock className="w-4 h-4 text-[#FFC857] shrink-0" /> 15-Minute Guaranteed SLA Sentinel
                </span>
              </div>
            </section>

            {/* Interactive 4-Step Customer Journey Walkthrough */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#00D2C4] uppercase tracking-widest">
                  End-to-End Travel Made Effortless
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  How StaySphere Takes Care of Your Entire Vacation
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                  Click any stage below to explore how you book your hotel, airport pickup, local sightseeing, and return airport drop.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* Step 1 */}
                <div
                  onClick={() => navigateToTab('explore')}
                  className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#00A9A5] hover:bg-[#002B4D]/40 transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00A9A5]/20 text-[#00D2C4] flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug flex items-center justify-between gap-2">
                      <span>1. Luxury Stays</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00D2C4] transition-colors shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Choose from 5-star hotels, beachfront resorts, serviced apartments, and pool villas with transparent pricing.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#00D2C4] block pt-2">Explore Stays →</span>
                </div>

                {/* Step 2 */}
                <div
                  onClick={() => navigateToTab('booking', 2, PROPERTIES[0])}
                  className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#FF8A3D] hover:bg-[#002B4D]/40 transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF8A3D]/20 text-[#FF8A3D] flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
                      <Plane className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug flex items-center justify-between gap-2">
                      <span>2. Airport Transfers</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF8A3D] transition-colors shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Live flight arrival tracking. VIP meet-and-greet in a Maybach or Defender directly to your hotel lobby.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF8A3D] block pt-2">Configure Transit →</span>
                </div>

                {/* Step 3 */}
                <div
                  onClick={() => navigateToTab('booking', 2, PROPERTIES[0])}
                  className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#FFC857] hover:bg-[#002B4D]/40 transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFC857]/20 text-[#FFC857] flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug flex items-center justify-between gap-2">
                      <span>3. Local Excursions</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FFC857] transition-colors shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Curated speedboats, solar boat palace tours, snow safaris, and heritage trails with dedicated tour guides.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#FFC857] block pt-2">Pick Excursions →</span>
                </div>

                {/* Step 4 */}
                <div
                  onClick={() => navigateToTab('myjourney')}
                  className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#3CCF91] hover:bg-[#002B4D]/40 transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3CCF91]/20 text-[#3CCF91] flex items-center justify-center font-black group-hover:scale-110 transition-transform shrink-0">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug flex items-center justify-between gap-2">
                      <span>4. Live Journey Radar</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3CCF91] transition-colors shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Live GPS radar for airport pickup, instant NFC digital room key, and automated flight drop-off sync.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#3CCF91] block pt-2">View Live Radar →</span>
                </div>
              </div>
            </section>

            {/* Featured Destinations & Stays */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#FF8A3D] uppercase tracking-widest">
                    Featured Destinations
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Verified Luxury Stays & Experiential Tours
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToTab('explore')}
                  className="text-xs font-bold text-[#00D2C4] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All 4 Destinations & Properties</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {PROPERTIES.map((property) => (
                  <div
                    key={property.id}
                    className="glass-panel-luxury rounded-3xl border border-white/10 overflow-hidden hover:border-[#E5B869]/60 transition-all duration-500 flex flex-col group shadow-xl"
                  >
                    <div className="relative h-72 overflow-hidden bg-slate-950">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-transparent to-black/40" />
                      
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#002B4D]/90 backdrop-blur-md border border-[#E5B869]/40 text-[#F3CA7E] text-[11px] font-black tracking-wide">
                          {property.propertyTypeLabel}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#020B18]/90 backdrop-blur-md border border-[#10B981]/40 text-[#10B981] text-[11px] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> {property.trustScore}% Verified
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#001E38]/90 backdrop-blur-md border border-[#00D2C4]/30 text-[#00D2C4] text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Direct PMS Sync
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#020B18]/90 backdrop-blur-md border border-[#FFC857]/40 text-[#FFC857] text-xs font-black flex items-center gap-1 shadow-lg">
                          <Star className="w-3.5 h-3.5 fill-[#FFC857]" /> {property.rating} ({property.reviewCount})
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="text-xs text-[#F3CA7E] flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#FF8A3D]" /> {property.location}
                          </span>
                          <h3 className="text-xl font-serif-luxury font-bold text-white mt-0.5">{property.name}</h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-2xl font-serif-luxury font-bold text-[#F3CA7E]">₹{property.pricePerNight.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 block font-sans">/ night</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {property.tagline}
                      </p>

                      {/* Inclusions */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <span className="text-[11px] font-bold text-[#F3CA7E] uppercase tracking-wider block">
                          Sovereign Experience Inclusions:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {property.exclusiveInclusions.map((inclusion, idx) => (
                            <span key={idx} className="text-xs text-slate-200 flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                              <span>{inclusion}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                        <span className="text-xs text-[#00D2C4] font-bold flex items-center gap-1">
                          <Car className="w-4 h-4" /> Airport Chauffeur + Sightseeing Ready
                        </span>

                        <button
                          type="button"
                          onClick={() => navigateToTab('booking', 1, property)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#E5B869] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Book Stay & Travel</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* B2B Partner Onboarding Banner */}
            <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#002B4D] via-[#001830] to-[#001020] border border-[#FFC857]/40 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC857]/20 border border-[#FFC857]/40 text-[#FFC857] text-xs font-black">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>For Hotel Owners, Resort Managers & Villa Hosts</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Partner With StaySphere — List Your Property
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Join India's premier high-spending guest network. Enjoy guaranteed escrow payouts, integrated chauffeur logistics, and zero booking friction.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPartnerModal(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#FF8A3D] hover:brightness-110 text-[#001428] font-black text-xs shadow-xl shadow-[#FF8A3D]/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Register Your Property Now</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EXPLORE HOTELS, RESORTS & VILLAS                                   */}
        {/* ========================================================================= */}
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#00D2C4] uppercase tracking-widest flex items-center gap-1">
                  <Hotel className="w-3.5 h-3.5" /> Verified Catalog
                </span>
                <h1 className="text-3xl font-black text-white mt-1">Luxury Hotels, Resorts & Villas</h1>
                <p className="text-xs text-slate-300 mt-1">
                  Every reservation includes safe escrow guarantee, flight-tracked airport cabs, and local sightseeing excursions.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === 'all' ? 'bg-[#00A9A5] text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  All (4)
                </button>
                <button
                  onClick={() => setSelectedCategory('coastal')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === 'coastal' ? 'bg-[#00A9A5] text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  Goa Beach
                </button>
                <button
                  onClick={() => setSelectedCategory('palace')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === 'palace' ? 'bg-[#00A9A5] text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  Udaipur Palace
                </button>
                <button
                  onClick={() => setSelectedCategory('chalet')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === 'chalet' ? 'bg-[#00A9A5] text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  Manali Snow
                </button>
                <button
                  onClick={() => setSelectedCategory('apartment')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === 'apartment' ? 'bg-[#00A9A5] text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  Mumbai Penthouse
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROPERTIES.filter((p) => selectedCategory === 'all' || p.category === selectedCategory).map((property) => (
                <div
                  key={property.id}
                  className="glass-panel rounded-3xl border border-white/10 overflow-hidden hover:border-[#00A9A5]/50 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001428] via-transparent to-black/30" />
                    
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#002B4D]/90 backdrop-blur-md border border-[#00A9A5]/40 text-[#00D2C4] text-[11px] font-black">
                        {property.propertyTypeLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span className="text-xs text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FF8A3D]" /> {property.location}
                        </span>
                        <h3 className="text-xl font-black text-white mt-0.5">{property.name}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xl font-black text-white">₹{property.pricePerNight.toLocaleString()}</span>
                        <span className="text-xs text-slate-400 block">/ night</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {property.description}
                    </p>

                    {/* Room Types */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Available Suite & Villa Categories:
                      </span>
                      <div className="space-y-1.5">
                        {property.villas.map((villa, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-[#001020] border border-white/5 flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{villa.name}</span>
                            <span className="text-[#00D2C4] font-black">₹{villa.price.toLocaleString()} / night</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      <div className="text-xs text-slate-400">
                        Airport: <strong className="text-slate-200">{property.destinationCity} VIP Gate</strong>
                      </div>

                      <button
                        onClick={() => handleStartBooking(property)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>Book Stay, Cab & Tours</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COMPLETE BOOKING FLOW (HOTEL + AIRPORT CAB + SIGHTSEEING + DROP)    */}
        {/* ========================================================================= */}
        {activeTab === 'booking' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#FF8A3D] uppercase tracking-widest">
                Integrated 3-Step Journey Builder
              </span>
              <h1 className="text-3xl font-black text-white">
                Book Stay, Airport Transfers, Local Mobility & Return Drop
              </h1>
              <p className="text-xs text-slate-300">
                Protected by StaySphere Milestone Custody. Payments are disbursed to partners only after your verified arrival.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { step: 1, title: '1. Hotel & Dates', icon: Hotel },
                { step: 2, title: '2. Airport Cab & Sightseeing', icon: Car },
                { step: 3, title: '3. Safe Escrow & Confirm', icon: ShieldCheck },
              ].map((s) => (
                <div
                  key={s.step}
                  onClick={() => !bookingConfirmed && setBookingStep(s.step as 1 | 2 | 3)}
                  className={`p-3 rounded-2xl border text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    bookingStep === s.step
                      ? 'bg-[#002B4D] border-[#00A9A5] text-white shadow-lg shadow-[#00A9A5]/20'
                      : bookingStep > s.step
                      ? 'bg-[#001020] border-[#3CCF91]/50 text-[#3CCF91]'
                      : 'bg-[#001020] border-white/10 text-slate-500'
                  }`}
                >
                  <s.icon className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold whitespace-nowrap">{s.title}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: RESIDENCE & SUITE SELECTION */}
            {bookingStep === 1 && (
              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-xl font-black text-white">
                      {selectedEstate ? selectedEstate.name : 'Select Your Sanctuary'}
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {selectedEstate ? selectedEstate.location : 'Choose your preferred destination and suite category.'}
                    </p>
                  </div>
                  <Hotel className="w-8 h-8 text-[#00A9A5]" />
                </div>

                {/* Suite Category Selection */}
                {selectedEstate && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase">Select Suite / Villa Category</label>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedEstate.villas.map((villa) => (
                        <div
                          key={villa.name}
                          onClick={() => setSelectedVilla(villa.name)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            selectedVilla === villa.name
                              ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg shadow-[#00A9A5]/20'
                              : 'bg-[#001020] border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-white">{villa.name}</h4>
                            <p className="text-xs text-slate-400 mt-1">{villa.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {villa.curatedPerks.map((perk, idx) => (
                                <span key={idx} className="text-[10px] text-[#3CCF91] font-bold flex items-center gap-1 whitespace-nowrap shrink-0">
                                  <Sparkles className="w-3 h-3 shrink-0" /> {perk}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-lg font-black text-white">₹{villa.price.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 block">/ night</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Check-In Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full mt-1.5 p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold text-xs outline-none focus:border-[#00A9A5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Stay Duration</label>
                    <select
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full mt-1.5 p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold text-xs outline-none cursor-pointer"
                    >
                      <option value={2}>2 Nights Stay</option>
                      <option value={3}>3 Nights Bespoke Stay</option>
                      <option value={5}>5 Nights Week Stay</option>
                      <option value={7}>7 Nights Extended Holiday</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Number of Guests</label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full mt-1.5 p-3 rounded-xl bg-[#001020] border border-white/10 text-white font-bold text-xs outline-none cursor-pointer"
                    >
                      <option value={2}>2 Adults (Couple)</option>
                      <option value={4}>4 Adults (Family / Group)</option>
                      <option value={6}>6 Adults (Full Private Suite / Villa)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] hover:brightness-110 text-white font-black text-xs shadow-lg shadow-[#00A9A5]/30 flex items-center gap-2"
                  >
                    <span>Proceed to Airport Travel & Sightseeing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: AIRPORT TRANSIT (PICKUP & DROP) + LOCAL SIGHTSEEING EXCURSIONS */}
            {bookingStep === 2 && (
              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-xl font-black text-white">Airport Travel & Local Sightseeing</h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Select your flight-tracked airport pickup, local sightseeing day excursions, and airport drop.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-6 h-6 text-[#00D2C4]" />
                    <Compass className="w-6 h-6 text-[#FF8A3D]" />
                  </div>
                </div>

                {/* Section A: Airport Transit Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-[#FF8A3D]" />
                      <span>1. Airport Transit Route Selection</span>
                    </label>
                    <span className="text-[11px] font-bold text-[#3CCF91]">Live GPS & Flight Radar Synced</span>
                  </div>

                  {/* Mode Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onClick={() => setTransitMode('roundtrip')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                        transitMode === 'roundtrip'
                          ? 'bg-[#002B4D] border-[#FF8A3D] shadow-lg shadow-[#FF8A3D]/20'
                          : 'bg-[#001020] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">Full Roundtrip</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF8A3D]/20 text-[#FF8A3D] font-bold">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Airport Pickup → Hotel + Return Hotel → Airport Drop.
                      </p>
                      <span className="text-xs font-black text-[#00D2C4] block pt-1">
                        ₹{(vehiclePricePerLeg * 2).toLocaleString()} total
                      </span>
                    </div>

                    <div
                      onClick={() => setTransitMode('pickup_only')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                        transitMode === 'pickup_only'
                          ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg shadow-[#00A9A5]/20'
                          : 'bg-[#001020] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold text-xs text-white block">Airport Pickup Only</span>
                      <p className="text-[11px] text-slate-300">
                        Arrival Flight Meet & Greet → Direct transfer to Hotel lobby.
                      </p>
                      <span className="text-xs font-black text-[#00D2C4] block pt-1">
                        ₹{vehiclePricePerLeg.toLocaleString()}
                      </span>
                    </div>

                    <div
                      onClick={() => setTransitMode('drop_only')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                        transitMode === 'drop_only'
                          ? 'bg-[#002B4D] border-[#00A9A5] shadow-lg shadow-[#00A9A5]/20'
                          : 'bg-[#001020] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold text-xs text-white block">Airport Drop Only</span>
                      <p className="text-[11px] text-slate-300">
                        Hotel → Airport VIP Terminal with return flight check-in sync.
                      </p>
                      <span className="text-xs font-black text-[#00D2C4] block pt-1">
                        ₹{vehiclePricePerLeg.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Fleet Selection */}
                  {transitMode !== 'none' && (
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Select Luxury Chauffeur Fleet</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div
                          onClick={() => setTransferVehicle('maybach')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'maybach'
                              ? 'bg-[#002B4D] border-[#FFC857] shadow-md'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">Mercedes-Maybach S680</span>
                            <Crown className="w-3.5 h-3.5 text-[#FFC857]" />
                          </div>
                          <p className="text-[10px] text-slate-400">VIP tarmac meet, chilled bottled water, Wi-Fi hotspot</p>
                          <span className="text-xs font-bold text-[#FFC857] block">₹4,500 / leg</span>
                        </div>

                        <div
                          onClick={() => setTransferVehicle('defender')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'defender'
                              ? 'bg-[#002B4D] border-[#00A9A5] shadow-md'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">Land Rover Defender</span>
                            <Mountain className="w-3.5 h-3.5 text-[#00D2C4]" />
                          </div>
                          <p className="text-[10px] text-slate-400">All-terrain luxury, high luggage capacity, panoramic glass</p>
                          <span className="text-xs font-bold text-[#00D2C4] block">₹3,800 / leg</span>
                        </div>

                        <div
                          onClick={() => setTransferVehicle('electric')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'electric'
                              ? 'bg-[#002B4D] border-[#3CCF91] shadow-md'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">BMW i7 Luxury EV Sedan</span>
                            <Zap className="w-3.5 h-3.5 text-[#3CCF91]" />
                          </div>
                          <p className="text-[10px] text-slate-400">Zero-emission whisper quiet ride, executive rear lounge</p>
                          <span className="text-xs font-bold text-[#3CCF91] block">₹2,800 / leg</span>
                        </div>
                      </div>

                      {/* Flight Details Input */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
                            <Plane className="w-3.5 h-3.5 text-[#3CCF91]" />
                            <span>Arrival Flight Number (For Pickup)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 6E-204 / AI-865"
                            value={arrivalFlightNumber}
                            onChange={(e) => setArrivalFlightNumber(e.target.value.toUpperCase())}
                            className="w-full mt-1 p-2.5 rounded-xl bg-[#001020] border border-white/10 text-white font-mono text-xs font-bold outline-none focus:border-[#00A9A5]"
                          />
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            Chauffeur automatically tracks landing time & terminal gate.
                          </span>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
                            <Plane className="w-3.5 h-3.5 text-[#FF8A3D]" />
                            <span>Departure Return Flight Number (For Drop)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. AI-678 / UK-992"
                            value={departureFlightNumber}
                            onChange={(e) => setDepartureFlightNumber(e.target.value.toUpperCase())}
                            className="w-full mt-1 p-2.5 rounded-xl bg-[#001020] border border-white/10 text-white font-mono text-xs font-bold outline-none focus:border-[#00A9A5]"
                          />
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            Chauffeur picks you up from hotel porch 3 hours before flight.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section B: Curated Local Sightseeing Day Tours */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#00D2C4]" />
                        <span>2. Curated Local Sightseeing Excursions in {currentDestination}</span>
                      </label>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Add destination-tailored day tours with private chauffeur, licensed guide & exclusive perks.
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[#FFC857]">
                      {selectedSightseeingIds.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {availableSightseeing.map((tour) => {
                      const isSelected = selectedSightseeingIds.includes(tour.id);
                      return (
                        <div
                          key={tour.id}
                          onClick={() => handleToggleSightseeing(tour.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-[#002B4D] border-[#00D2C4] shadow-lg shadow-[#00D2C4]/20'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-6 h-6 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-[#00D2C4] border-[#00D2C4] text-[#001428]'
                                  : 'border-white/30 bg-transparent text-transparent'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>

                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm text-white">{tour.name}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00A9A5]/20 text-[#00D2C4] font-bold whitespace-nowrap shrink-0">
                                  {tour.badge}
                                </span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1 whitespace-nowrap shrink-0">
                                  <Clock className="w-3 h-3 shrink-0" /> {tour.duration}
                                </span>
                              </div>

                              <p className="text-xs text-slate-300">{tour.tagline}</p>

                              <div className="flex flex-wrap gap-2 pt-1">
                                {tour.highlights.map((highlight, idx) => (
                                  <span key={idx} className="text-[10px] text-[#3CCF91] font-semibold flex items-center gap-1 whitespace-nowrap shrink-0">
                                    <Sparkles className="w-2.5 h-2.5 shrink-0" /> {highlight}
                                  </span>
                                ))}
                              </div>

                              <div className="text-[11px] text-slate-400 pt-0.5">
                                Included Transit: <strong className="text-slate-200">{tour.includedVehicle}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="text-left sm:text-right shrink-0 pl-9 sm:pl-0">
                            <span className="text-base font-black text-white">₹{tour.price.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 block whitespace-nowrap">all-inclusive</span>
                            <span className={`text-[11px] font-bold mt-1 inline-block whitespace-nowrap ${isSelected ? 'text-[#00D2C4]' : 'text-slate-400'}`}>
                              {isSelected ? '✓ Added to Booking' : '+ Click to Add'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
                  >
                    Back to Suite Selection
                  </button>
                  <button
                    onClick={() => setBookingStep(3)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] hover:brightness-110 text-white font-black text-xs shadow-lg shadow-[#00A9A5]/30 flex items-center gap-2"
                  >
                    <span>Proceed to Milestone Payment Protection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MILESTONE PAYMENT BREAKDOWN & CONFIRM */}
            {bookingStep === 3 && (
              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
                {!bookingConfirmed ? (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div>
                        <h2 className="text-xl font-black text-white">Milestone Payment Protection & Confirmation</h2>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Your payment remains protected in milestone custody until after your confirmed arrival.
                        </p>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-[#3CCF91]" />
                    </div>

                    {/* Promotions & Coupon Code Box */}
                    <form onSubmit={handleApplyPromo} className="p-4 rounded-2xl bg-[#001020] border border-white/10 flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-white shrink-0">
                        <Percent className="w-4 h-4 text-[#FFC857]" />
                        <span>Have a Promo Offer?</span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. MONSOON20 / STAYSPHERE2026"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        className="flex-1 w-full sm:w-auto p-2.5 rounded-xl bg-[#001830] border border-white/10 text-white font-mono text-xs uppercase outline-none focus:border-[#FFC857]"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFC857] to-[#FF8A3D] text-[#001428] font-black text-xs hover:brightness-110"
                      >
                        Apply Promo
                      </button>
                    </form>
                    {promoMessage && (
                      <p className="text-xs text-[#3CCF91] font-semibold -mt-2 px-1">
                        {promoMessage}
                      </p>
                    )}

                    {/* Detailed Itemized Breakdown */}
                    <div className="p-5 rounded-2xl bg-[#001020] border border-white/10 space-y-3 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>
                          🏨 <strong>{selectedVilla || selectedEstate?.name}</strong> ({nights} Nights)
                        </span>
                        <span className="font-bold text-white">₹{staySubtotal.toLocaleString()}</span>
                      </div>

                      {pickupCost > 0 && (
                        <div className="flex justify-between text-slate-300">
                          <span>
                            ✈️ Airport Pickup Chauffeur ({transferVehicle.toUpperCase()} – Flight: {arrivalFlightNumber})
                          </span>
                          <span className="font-bold text-white">₹{pickupCost.toLocaleString()}</span>
                        </div>
                      )}

                      {dropCost > 0 && (
                        <div className="flex justify-between text-slate-300">
                          <span>
                            🛫 Airport Return Drop Chauffeur ({transferVehicle.toUpperCase()} – Flight: {departureFlightNumber})
                          </span>
                          <span className="font-bold text-white">₹{dropCost.toLocaleString()}</span>
                        </div>
                      )}

                      {selectedSightseeingIds.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {selectedSightseeingIds.map((id) => {
                            const tour = SIGHTSEEING_CATALOG.find((t) => t.id === id);
                            if (!tour) return null;
                            return (
                              <div key={id} className="flex justify-between text-slate-300 pl-2 border-l border-[#00A9A5]">
                                <span>🗺️ {tour.name}</span>
                                <span className="font-bold text-white">₹{tour.price.toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {bundleDiscount > 0 && (
                        <div className="flex justify-between text-[#3CCF91] pt-1">
                          <span>🏷️ Complete Holiday Bundle Discount (Transit + Tours)</span>
                          <span className="font-bold">-₹{bundleDiscount.toLocaleString()}</span>
                        </div>
                      )}

                      {appliedPromo && promoDiscountAmount > 0 && (
                        <div className="flex justify-between text-[#FFC857] pt-1">
                          <span>🎉 Promo Discount ({appliedPromo.code} – {appliedPromo.discountPercent}%)</span>
                          <span className="font-bold">-₹{promoDiscountAmount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                        <span>🛡️ Hospitality Taxes & Payment Protection Fee (12%)</span>
                        <span className="font-bold text-white">₹{luxuryTaxes.toLocaleString()}</span>
                      </div>

                      <div className="pt-3 border-t border-white/15 flex justify-between text-sm font-black text-white">
                        <span>Total Protected Amount</span>
                        <span className="text-xl text-[#00D2C4]">₹{totalBill.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Milestone Protection Banner */}
                    <div className="p-4 rounded-2xl bg-[#002244]/60 border border-[#00A9A5]/40 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#3CCF91] shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <strong className="text-white block font-bold">StaySphere Milestone Payment & Dispute Protection</strong>
                        <p className="text-slate-300 leading-relaxed">
                          Your booking payment is held in protected custody. Accommodation, chauffeur, and tour partners receive disbursements following verified arrival, backed by our 15-minute proactive resolution guarantee.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-white/10">
                      <button
                        onClick={() => setBookingStep(2)}
                        className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
                      >
                        Back to Transit & Sightseeing
                      </button>
                      <button
                        onClick={handleCompleteBooking}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/25 flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Confirm & Lock in Escrow (₹{totalBill.toLocaleString()})</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* Confirmation State */
                  <div className="text-center py-8 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#3CCF91]/20 border border-[#3CCF91] flex items-center justify-center text-[#3CCF91] mx-auto animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#3CCF91] uppercase tracking-widest">
                        Reservation Confirmed & Safe in Escrow
                      </span>
                      <h2 className="text-3xl font-black text-white">Your Entire Journey is Booked!</h2>
                      <p className="text-xs text-slate-300 max-w-lg mx-auto">
                        Your booking <strong className="text-[#00D2C4] font-mono">{confirmedBookingId}</strong> has been locked in Safe Escrow. Your flight pickup cab, hotel digital key, sightseeing tour, and airport drop are all scheduled.
                      </p>
                    </div>

                    {/* Complete Booking Itinerary Card */}
                    <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#001020] border border-white/15 text-left text-xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-white/10">
                        <span className="text-slate-400 shrink-0">1. Property & Suite:</span>
                        <strong className="text-white text-left sm:text-right min-w-0 break-words">{selectedEstate?.name} ({selectedVilla})</strong>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-white/10">
                        <span className="text-slate-400 shrink-0">2. Airport Pickup:</span>
                        <strong className="text-[#00D2C4] text-left sm:text-right min-w-0 break-words">
                          {transferVehicle.toUpperCase()} (Flight: {arrivalFlightNumber} @ {selectedEstate?.defaultAirport})
                        </strong>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-white/10">
                        <span className="text-slate-400 shrink-0">3. Sightseeing Tours:</span>
                        <strong className="text-[#FFC857] text-left sm:text-right min-w-0 break-words">
                          {selectedSightseeingIds.length > 0
                            ? selectedSightseeingIds.map((id) => SIGHTSEEING_CATALOG.find((t) => t.id === id)?.name).join(', ')
                            : 'None Selected'}
                        </strong>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-white/10">
                        <span className="text-slate-400 shrink-0">4. Airport Drop:</span>
                        <strong className="text-[#3CCF91] text-left sm:text-right min-w-0 break-words">
                          {transferVehicle.toUpperCase()} (Flight: {departureFlightNumber} @ Terminal Drop)
                        </strong>
                      </div>
                      <div className="flex justify-between items-center pt-1 text-sm">
                        <span className="text-slate-300 font-bold">Total Paid in Safe Escrow:</span>
                        <strong className="text-[#3CCF91] font-black shrink-0 text-right whitespace-nowrap">₹{totalBill.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                      <button
                        onClick={() => setActiveTab('myjourney')}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white font-black text-xs shadow-lg shadow-[#00A9A5]/30 flex items-center gap-2 hover:brightness-110 transition-all"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Launch Live Journey Radar & Timeline</span>
                      </button>
                      <button
                        onClick={() => {
                          setResolveCategory('PRE_ARRIVAL');
                          setShowResolveModal(true);
                        }}
                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#3CCF91]" />
                        <span>Proactive Resolve Sentinel (15m SLA)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MY JOURNEY (SYNCHRONIZED TIMELINE & PROACTIVE RESOLVE SENTINEL)   */}
        {/* ========================================================================= */}
        {(activeTab === 'myjourney' || activeTab === 'resolve') && (
          <MyJourneyView
            onOpenResolve={(cat) => {
              setResolveCategory(cat || 'GENERAL_INQUIRY');
              setShowResolveModal(true);
            }}
          />
        )}
      </main>

      {/* Floating Persistent Resolve Sentinel Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setResolveCategory('GENERAL_INQUIRY');
            setShowResolveModal(true);
          }}
          className="group px-4 py-3 rounded-full bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#00A9A5] text-[#001428] font-black text-xs shadow-2xl shadow-[#FF8A3D]/40 hover:scale-105 transition-all flex items-center gap-2 border-2 border-white/20 cursor-pointer"
        >
          <div className="relative">
            <ShieldCheck className="w-5 h-5 text-[#001428]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="hidden sm:inline">Resolve Desk</span>
          <span className="px-2 py-0.5 rounded-full bg-black/80 text-[#FFC857] text-[10px] font-extrabold font-mono">
            15m SLA
          </span>
        </button>
      </div>

      {/* Proactive Resolution Sentinel Modal */}
      <ProactiveResolveSentinel
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        defaultCategory={resolveCategory}
        journeyReference={confirmedBookingId ? `JN-SS-2026-${confirmedBookingId.replace(/\D/g, '') || '9041'}` : 'JN-SS-2026-9041'}
      />

      {/* Partner Registration Multi-Stakeholder Modal */}
      <PartnerRegistrationModal
        isOpen={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#001020] py-8 px-4 sm:px-8 text-xs text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HorizontalLogo size="sm" variant="dark" />
            <span className="text-slate-500">|</span>
            <span>Coordinated Stays, Travel & Protected Payments</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">© 2026 StaySphere Journey Platform Pvt. Ltd.</span>
            <button
              onClick={() => setShowPartnerModal(true)}
              className="text-[#FFC857] font-bold hover:underline"
            >
              Partner Network
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
