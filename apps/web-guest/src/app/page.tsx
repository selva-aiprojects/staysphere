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
  Sun,
  Moon,
  User,
  UserCheck,
  Bot,
  MessageSquareCode,
} from 'lucide-react';
import { HorizontalLogo, LogoOnDark, StackedLogo, AppIcon, EmblemImageLogo } from '@staysphere/ui-kit';
import { PartnerRegistrationModal } from '../components/PartnerRegistrationModal';
import { MyJourneyView } from '../components/MyJourneyView';
import { ProactiveResolveSentinel } from '../components/ProactiveResolveSentinel';
import { CustomerAuthModal, CustomerUser, FREQUENT_GUEST_PRESETS } from '../components/CustomerAuthModal';
import { GuestChatbotModal } from '../components/GuestChatbotModal';
import { PartnerChatbotModal } from '../components/PartnerChatbotModal';

export type StayTier = 'comfort' | 'premium' | 'luxe';

export interface VillaCategory {
  name: string;
  price: number;
  description: string;
  curatedPerks: string[];
}

export interface StayEstate {
  id: string;
  name: string;
  location: string;
  destinationCity: string;
  tier: StayTier;
  tierLabel: string;
  category: 'homestay' | 'hotel' | 'resort' | 'chalet' | 'apartment' | 'palace' | 'coastal';
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

export type LuxuryEstate = StayEstate;

export interface SightseeingPackage {
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
    badge: 'Signature Pick',
  },
  {
    id: 'goa-heritage',
    name: 'Old Goa UNESCO Heritage & Spice Farm Safari',
    destinationCity: 'Goa',
    duration: '5 Hours (9:30 AM – 2:30 PM)',
    price: 1600,
    tagline: 'Centuries-old cathedrals, authentic Goan spice plantation walk, and organic buffet lunch.',
    highlights: [
      'Basilica of Bom Jesus & Se Cathedral guided tour',
      'Sahakari Spice Farm traditional buffet lunch',
      'Botanical plantation walk with expert naturalist',
      'Clean air-conditioned cab transfer included',
    ],
    includedVehicle: 'Comfort AC Sedan / MPV',
    badge: 'Best Value',
  },
  {
    id: 'goa-flea-beach',
    name: 'North Goa Coastal Explorer & Anjuna Trail',
    destinationCity: 'Goa',
    duration: '4 Hours (2:00 PM – 6:00 PM)',
    price: 950,
    tagline: 'Scenic coastal drive covering Vagator cliff view, Chapora fort, and local market.',
    highlights: [
      'Iconic Chapora Fort viewpoint & photo stop',
      'Vagator sunset viewpoint with coconut refreshments',
      'Local flea market and handicraft trail',
      'Door-to-door cab pickup and drop',
    ],
    includedVehicle: 'City AC Sedan Cab',
    badge: 'Budget Friendly',
  },

  // BENGALURU
  {
    id: 'blr-tech',
    name: 'Silicon City Tech & Craft Brewery Discovery',
    destinationCity: 'Bengaluru',
    duration: '4 Hours (4:30 PM – 8:30 PM)',
    price: 1200,
    tagline: 'Explore Indiranagar & Koramangala vibrant food, craft beer, and coffee culture.',
    highlights: [
      'Guided craft brewery and artisan coffee tasting',
      'Church Street & MG Road walking experience',
      'Curated dining table reservation included',
      'Seamless City EV Cab pickup and drop',
    ],
    includedVehicle: 'City EV Sedan Cab',
    badge: 'City Life',
  },
  {
    id: 'blr-nandi',
    name: 'Nandi Hills Sunrise & Heritage Vineyard Tour',
    destinationCity: 'Bengaluru',
    duration: '6 Hours (5:00 AM – 11:00 AM)',
    price: 2400,
    tagline: 'Early morning cloud-top sunrise at Nandi Hills followed by Grover Zampa vineyard tour.',
    highlights: [
      'Scenic early morning sunrise above the clouds',
      'Grover Zampa vineyard walk & wine tasting',
      'Traditional South Indian breakfast at foothill',
      'Comfortable highway MPV with experienced driver',
    ],
    includedVehicle: 'Comfort MPV / Family SUV',
    badge: 'Popular Weekend Trip',
  },

  // JAIPUR
  {
    id: 'jpr-amber',
    name: 'Amber Fort, Hawa Mahal & Artisan Bazaar Trail',
    destinationCity: 'Jaipur',
    duration: '5 Hours (9:00 AM – 2:00 PM)',
    price: 1600,
    tagline: 'Explore the majestic Amber Fort with skip-the-line guide and traditional bazaar walk.',
    highlights: [
      'Amber Fort guided palace courtyard walk',
      'Hawa Mahal photo stop & Jal Mahal viewpoint',
      'Johari Bazaar authentic gemstone & textile trail',
      'Air-conditioned private city transfer',
    ],
    includedVehicle: 'AC City Sedan',
    badge: 'Cultural Highlight',
  },
  {
    id: 'jpr-nahargarh',
    name: 'Nahargarh Fort Sunset & Royal Dinner Drive',
    destinationCity: 'Jaipur',
    duration: '4 Hours (4:30 PM – 8:30 PM)',
    price: 2200,
    tagline: 'Breathtaking sunset panoramic view over the Pink City with rooftop royal dining.',
    highlights: [
      'Nahargarh Fort hilltop sunset panorama',
      'Padao open-air rooftop dinner reservation',
      'Illuminated night drive of Albert Hall Museum',
      'Chauffeured pickup and hotel drop',
    ],
    includedVehicle: 'Comfort AC Sedan / Chauffeur',
    badge: 'Romantic Sunset',
  },

  // UDAIPUR
  {
    id: 'udr-palace',
    name: 'Lake Pichola Solar Boat & City Palace Royal Tour',
    destinationCity: 'Udaipur',
    duration: '4.5 Hours (10:00 AM – 2:30 PM)',
    price: 3800,
    tagline: 'Chartered boat to Jagmandir Island with skip-the-line royal City Palace historian guide.',
    highlights: [
      'Chartered solar boat across Lake Pichola',
      'Skip-the-line City Palace royal historian guide',
      'Mewari high tea at sunset terrace',
      'Handcrafted souvenir & heritage artisan walk',
    ],
    includedVehicle: 'Private Solar Boat + Heritage Chauffeur',
    badge: 'Royal Signature',
  },
  {
    id: 'udr-cultural',
    name: 'Bagore Ki Haveli Folk Show & Old Bazaar Trail',
    destinationCity: 'Udaipur',
    duration: '3.5 Hours (6:00 PM – 9:30 PM)',
    price: 1400,
    tagline: 'Reserved front-row Rajasthani folk dance at historic haveli followed by old bazaar trail.',
    highlights: [
      'Reserved VIP front-row Dharohar folk dance show',
      'Jagdish Temple & Old City silver artisan trail',
      'Traditional sweet tasting & puppet art demo',
      'City cab pickup and return to hotel',
    ],
    includedVehicle: 'City AC Sedan',
    badge: 'Heritage & Art',
  },

  // MANALI
  {
    id: 'manali-snow',
    name: 'Solang Valley & Atal Tunnel Snow Adventure',
    destinationCity: 'Manali',
    duration: '6 Hours (9:00 AM – 3:00 PM)',
    price: 3200,
    tagline: 'High-altitude snow adventure with snow activities and heated mountain vehicle.',
    highlights: [
      'Atal Tunnel North Portal high-altitude snow drive',
      'Snow scooter & cable car adventure viewpoint',
      'Hot mountain lunch & fresh saffron kahwa',
      'All thermal gear assistance included',
    ],
    includedVehicle: 'Heated 4x4 Mountain SUV',
    badge: 'Top Winter Pick',
  },
  {
    id: 'manali-heritage',
    name: 'Naggar Castle & Organic Apple Orchard Trail',
    destinationCity: 'Manali',
    duration: '4.5 Hours (10:30 AM – 3:00 PM)',
    price: 1500,
    tagline: '15th-century timber castle, Roerich Himalayan art gallery, and organic orchard walk.',
    highlights: [
      '15th-century medieval wooden Naggar Castle tour',
      'Nicholas Roerich Himalayan Art Gallery exploration',
      'Organic apple orchard walk with fresh cider',
      'Authentic Himachali Siddu & local cuisine tasting',
    ],
    includedVehicle: 'Comfort Mountain Cab',
    badge: 'Scenic Trail',
  },

  // MUMBAI
  {
    id: 'bom-heritage',
    name: 'South Bombay Heritage Drive & Marine Drive Tour',
    destinationCity: 'Mumbai',
    duration: '4 Hours (4:00 PM – 8:00 PM)',
    price: 2100,
    tagline: 'Gateway of India, Victoria Terminus, Colaba art quarter, and Queen’s Necklace sunset drive.',
    highlights: [
      'Gateway of India & Taj Mahal Palace photo stop',
      'Victoria Terminus & Kala Ghoda art quarter tour',
      'Queen’s Necklace sunset drive',
      'Chauffeured drop at Sea Lounge for heritage high tea',
    ],
    includedVehicle: 'Comfort AC Chauffeur Cab',
    badge: 'Iconic City Drive',
  },
  {
    id: 'bom-elephanta',
    name: 'Elephanta Island UNESCO Caves Speedboat Safari',
    destinationCity: 'Mumbai',
    duration: '5 Hours (9:00 AM – 2:00 PM)',
    price: 3200,
    tagline: 'Chartered speedboat from Gateway with an archaeological guide for 6th-century caves.',
    highlights: [
      'Chartered catamaran/speedboat from Gateway',
      'Archaeological guide for 6th-century rock-cut caves',
      'Fresh coconut refreshments on return cruise',
      'Seamless chauffeur pickup and drop',
    ],
    includedVehicle: 'Speedboat + AC Chauffeur Cab',
    badge: 'UNESCO Safari',
  },
];

const PROPERTIES: StayEstate[] = [
  // ==========================================
  // SMART & COMFORT (Budget Friendly: ₹1.8k – ₹3.5k)
  // ==========================================
  {
    id: 'estate-comfort-1',
    name: 'The Palm Grove Eco-Homestay & Garden Cottages',
    location: 'Anjuna Beach Road, North Goa',
    destinationCity: 'Goa',
    tier: 'comfort',
    tierLabel: 'Smart & Comfort',
    category: 'homestay',
    propertyTypeLabel: 'Verified Eco-Homestay & Cottages',
    rating: 4.89,
    reviewCount: 94,
    trustScore: 98.6,
    pricePerNight: 2400,
    image: '/brand/ocean_villa.jpg',
    tagline: 'Charming Garden Cottages near Anjuna Beach with Free Breakfast & AC Cabs',
    description: 'A lush, serene eco-homestay nestled amidst tropical coconut groves 5 minutes from Anjuna Beach. Features clean, air-conditioned cottages, high-speed fiber Wi-Fi, home-cooked Goan breakfasts, and guaranteed on-time airport cab sync.',
    defaultAirport: 'MOPA International Airport / Dabolim (GOX/GOI)',
    exclusiveInclusions: [
      'Complimentary Farm-Fresh Organic Breakfast',
      'High-Speed 200 Mbps Fiber Wi-Fi for Remote Work',
      'On-Time Flight-Tracked Airport Cab Sync',
      'Host-Assisted Scooter / Car Rental Coordination',
    ],
    villas: [
      {
        name: 'Deluxe Garden Cottage (350 sq.ft)',
        price: 2400,
        description: 'Cozy private cottage with queen bed, ensuite modern bathroom, porch patio, and garden views.',
        curatedPerks: ['Free Homemade Breakfast', 'Dedicated Wi-Fi Router', 'Airport Cab Discount'],
      },
      {
        name: 'Cozy Studio Room (280 sq.ft)',
        price: 1800,
        description: 'Clean air-conditioned studio with workstation desk, hot shower, and daily housekeeping.',
        curatedPerks: ['Free Breakfast', 'Smart TV with OTT', 'Host Guidance 24/7'],
      },
      {
        name: 'Family Garden Duplex (650 sq.ft)',
        price: 3800,
        description: 'Two interconnected rooms with twin bathrooms and private sit-out deck, ideal for families.',
        curatedPerks: ['Full Family Breakfast Included', 'Airport Pick & Drop Bundle', 'Complimentary Laundry'],
      },
    ],
  },
  {
    id: 'estate-comfort-2',
    name: 'Urban Hub Serviced Studio & Coworking Suites',
    location: '100ft Road, Indiranagar, Bengaluru',
    destinationCity: 'Bengaluru',
    tier: 'comfort',
    tierLabel: 'Smart & Comfort',
    category: 'apartment',
    propertyTypeLabel: 'Smart Serviced Studios & Suites',
    rating: 4.91,
    reviewCount: 168,
    trustScore: 99.1,
    pricePerNight: 3200,
    image: '/brand/chauffeur_transit.jpg',
    tagline: 'Modern Serviced Studios in the Heart of Indiranagar with Airport EV Pickup',
    description: 'Designed for agile professionals, remote founders, and city explorers. Features ergonomic work desks, 300 Mbps Wi-Fi, fully equipped kitchenette, fitness studio access, and seamless airport EV taxi integration.',
    defaultAirport: 'Kempegowda International Airport Bengaluru (BLR T1/T2)',
    exclusiveInclusions: [
      '300 Mbps Dedicated Fiber Wi-Fi & Workstation',
      'Kitchenette with Espresso Machine & Microwave',
      'Live Flight-Synced Airport EV Cab Pickup',
      'Keyless Smart Lock 24/7 Self Check-in',
    ],
    villas: [
      {
        name: 'Executive Smart Studio (420 sq.ft)',
        price: 3200,
        description: 'King bed, Herman Miller style ergonomic chair, standing desk, and smart kitchenette.',
        curatedPerks: ['Artisan Coffee & Snacks', 'Airport EV Transfer Sync', 'Daily Housekeeping'],
      },
      {
        name: 'Co-Living Studio Room (320 sq.ft)',
        price: 2500,
        description: 'Compact, ultra-functional studio with high-speed internet and soundproof double glass windows.',
        curatedPerks: ['Complimentary High-Speed Wi-Fi', 'Laundry Access', '24/7 Sentinel Support'],
      },
      {
        name: 'One-Bedroom Serviced Apartment (750 sq.ft)',
        price: 4600,
        description: 'Spacious living room, modular kitchen, dining space, and private city-view balcony.',
        curatedPerks: ['Free Airport Transfer', 'Gourmet Breakfast Box', 'Weekly Deep Clean'],
      },
    ],
  },
  {
    id: 'estate-comfort-3',
    name: 'Pink City Heritage Courtyard Homestay',
    location: 'Bani Park, Jaipur, Rajasthan',
    destinationCity: 'Jaipur',
    tier: 'comfort',
    tierLabel: 'Smart & Comfort',
    category: 'homestay',
    propertyTypeLabel: 'Verified Heritage Homestay',
    rating: 4.93,
    reviewCount: 112,
    trustScore: 98.9,
    pricePerNight: 2800,
    image: '/brand/royal_palace.jpg',
    tagline: 'Authentic Rajasthani Haveli Homestay with Rooftop Fort Views & Local Guides',
    description: 'Experience genuine Rajput hospitality in a lovingly restored 70-year-old family haveli. Enjoy traditional Mewari breakfasts in the central sunlit courtyard, evening folk music on the rooftop, and curated city auto/cab tours.',
    defaultAirport: 'Jaipur International Airport (JAI) / Railway Station',
    exclusiveInclusions: [
      'Traditional Rajasthani Breakfast in Courtyard',
      'Station / Airport Cab Pickup Coordination',
      'Rooftop Sunset Lounge with Nahargarh Views',
      'Host-Guided Old City Heritage Walk Advice',
    ],
    villas: [
      {
        name: 'Traditional Jharokha Room (360 sq.ft)',
        price: 2800,
        description: 'Hand-painted floral motifs, antique carved wooden bed, and authentic bay window seating.',
        curatedPerks: ['Complimentary Breakfast', 'Evening Masala Chai & Snacks', 'Station Pickup'],
      },
      {
        name: 'Courtyard Heritage Deluxe (300 sq.ft)',
        price: 2200,
        description: 'Facing the open central courtyard with cool marble floors, brass accents, and hot shower.',
        curatedPerks: ['Authentic Breakfast', 'Free High-Speed Wi-Fi', 'Local Tour Map'],
      },
      {
        name: 'Royal Heritage Family Suite (700 sq.ft)',
        price: 4200,
        description: 'Two large bedrooms with connected private balcony overlooking the city skyline.',
        curatedPerks: ['Family Breakfast Included', 'Airport Transfer Included', 'Complimentary Tea Service'],
      },
    ],
  },

  // ==========================================
  // PREMIUM SELECT (Mid to High: ₹7.5k – ₹10.5k)
  // ==========================================
  {
    id: 'estate-premium-1',
    name: 'The Coastal Courtyard Boutique Hotel & Pool Suites',
    location: 'Candolim Coast, North Goa',
    destinationCity: 'Goa',
    tier: 'premium',
    tierLabel: 'Premium Select',
    category: 'hotel',
    propertyTypeLabel: '4-Star Boutique Hotel & Pool Suites',
    rating: 4.94,
    reviewCount: 185,
    trustScore: 99.3,
    pricePerNight: 7800,
    image: '/brand/ocean_villa.jpg',
    tagline: 'Modern 4-Star Coastal Boutique Hotel with Lagoon Pool & Chauffeur Fleet',
    description: 'A stylish boutique property situated 300m from Candolim Beach. Offers designer balcony suites, lagoon swimming pool with sunken bar, multi-cuisine restaurant, and dedicated Innova Crysta airport transfer service.',
    defaultAirport: 'MOPA International Airport / Dabolim (GOX/GOI)',
    exclusiveInclusions: [
      'Innova Crysta Flight-Tracked Airport Pickup',
      'Daily Multi-Cuisine Hot Buffet Breakfast',
      'Lagoon Pool Access with Sunken Bar & Towels',
      'Complimentary Sunset Cocktail & Snacks',
    ],
    villas: [
      {
        name: 'Pool-Facing Balcony Suite (550 sq.ft)',
        price: 7800,
        description: 'Private balcony overlooking the lagoon pool, king bed, rainfall shower, and espresso station.',
        curatedPerks: ['Buffet Breakfast', 'Airport Chauffeur Transfer', 'Cocktail Hour Pass'],
      },
      {
        name: 'Executive Club Room (420 sq.ft)',
        price: 5800,
        description: 'Contemporary minimalist interiors, smart entertainment system, and plush orthopaedic king bed.',
        curatedPerks: ['Daily Breakfast', 'Pool Access', 'Late Checkout Assistance'],
      },
      {
        name: 'The Coastal Presidential Duplex (1,100 sq.ft)',
        price: 14500,
        description: 'Double-height ceiling, private rooftop jacuzzi deck, and master bedroom with panoramic views.',
        curatedPerks: ['Roundtrip Chauffeur Fleet', 'Sunset Cruise Voucher', 'Daily In-Suite Dining'],
      },
    ],
  },
  {
    id: 'estate-premium-2',
    name: 'The Pine Ridge Valley View Resort & Suites',
    location: 'Old Manali Hills, Himachal Pradesh',
    destinationCity: 'Manali',
    tier: 'premium',
    tierLabel: 'Premium Select',
    category: 'resort',
    propertyTypeLabel: '4-Star Mountain Resort & Chalet Suites',
    rating: 4.95,
    reviewCount: 130,
    trustScore: 99.2,
    pricePerNight: 8500,
    image: '/brand/alpine_chalet.jpg',
    tagline: 'Heated Himalayan Valley Suites with Cedar Balconies & 4x4 Mountain Rides',
    description: 'Perched high above Old Manali with panoramic views of snow-capped peaks and cedar forests. Features central heating, outdoor bonfire deck, apple orchard walks, and chauffeured 4x4 transfers to Solang & Rohtang.',
    defaultAirport: 'Bhuntar / Kullu-Manali Airport (KUU) / Chandigarh (IXC)',
    exclusiveInclusions: [
      'Chauffeured 4x4 Mountain SUV Transfer Sync',
      'Heated Rooms with Hardwood Cedar Floors',
      'Nightly Fireside Bonfire & Warm Kahwa Service',
      'Local Mountain Trek & Snow Activities Guide',
    ],
    villas: [
      {
        name: 'Valley View Cedar Suite (600 sq.ft)',
        price: 8500,
        description: 'Private glass balcony with 180° Himalayan valley views, fireplace, and goose-down duvets.',
        curatedPerks: ['Hot Buffet Breakfast', 'Heated Bedding', '4x4 Mountain Ride Included'],
      },
      {
        name: 'Pine Deluxe Room (450 sq.ft)',
        price: 6200,
        description: 'Warm timber interior, modern heated bathroom, tea & coffee bar, and forest views.',
        curatedPerks: ['Daily Mountain Breakfast', 'Bonfire Night Pass', 'High-Speed Wi-Fi'],
      },
      {
        name: 'Family Alpine Chalet Suite (1,200 sq.ft)',
        price: 15800,
        description: 'Two-bedroom wooden loft with living room, kitchenette, and private panoramic terrace.',
        curatedPerks: ['Full Breakfast & Dinner Included', 'Roundtrip Chauffeur', 'Solang Adventure Pass'],
      },
    ],
  },
  {
    id: 'estate-premium-3',
    name: 'The Royal Mewar Boutique Haveli & Lake Suites',
    location: 'Hanuman Ghat, Lake Pichola, Udaipur',
    destinationCity: 'Udaipur',
    tier: 'premium',
    tierLabel: 'Premium Select',
    category: 'palace',
    propertyTypeLabel: 'Boutique Heritage Haveli & Suites',
    rating: 4.96,
    reviewCount: 174,
    trustScore: 99.5,
    pricePerNight: 9800,
    image: '/brand/royal_palace.jpg',
    tagline: 'Lakefront Heritage Haveli with Rooftop Dining & Pichola Boat Rides',
    description: 'A 200-year-old heritage haveli right on the waters of Lake Pichola. Features ornately carved stone balconies, rooftop restaurant with direct views of the City Palace, and chauffeured airport transfers.',
    defaultAirport: 'Maharana Pratap Airport Udaipur (UDR)',
    exclusiveInclusions: [
      'Chauffeured Airport / Station Transfer',
      'Rooftop Multi-Cuisine Breakfast with Lake Views',
      'Sunset Boat Ride across Lake Pichola',
      'Traditional Royal Mewari Welcome Drink',
    ],
    villas: [
      {
        name: 'Heritage Lake View Suite (580 sq.ft)',
        price: 9800,
        description: 'Direct lake-facing marble jharokha window, king four-poster bed, and handcrafted Mewari artwork.',
        curatedPerks: ['Rooftop Breakfast', 'Sunset Boat Cruise', 'Airport Chauffeur Transfer'],
      },
      {
        name: 'Courtyard Deluxe Room (420 sq.ft)',
        price: 6800,
        description: 'Carved stone arches, antique brass lanterns, modern rain shower, and heritage furnishings.',
        curatedPerks: ['Complimentary Breakfast', 'Heritage City Walking Map', 'High-Speed Wi-Fi'],
      },
      {
        name: 'The Maharani Grand Suite (950 sq.ft)',
        price: 16500,
        description: 'Corner lake suite with private terrace, antique marble soaking tub, and personal host.',
        curatedPerks: ['Private Candlelight Dinner', 'Roundtrip Chauffeur', 'Complimentary High Tea'],
      },
    ],
  },

  // ==========================================
  // SIGNATURE & LUXE (Ultra Luxury: ₹36k – ₹65k)
  // ==========================================
  {
    id: 'estate-1',
    name: 'The Grand Vagator Bay Resort & Oceanfront Villas',
    location: 'Vagator Cliff, North Goa',
    destinationCity: 'Goa',
    tier: 'luxe',
    tierLabel: 'Signature Luxe',
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
    tier: 'luxe',
    tierLabel: 'Signature Luxe',
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
    tier: 'luxe',
    tierLabel: 'Signature Luxe',
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
    tier: 'luxe',
    tierLabel: 'Signature Luxe',
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
  // Light Pearl & Midnight Dark Theme State (Default to Light Pearl)
  const [theme, setTheme] = useState<'pearl' | 'dark'>('pearl');
  const isPearl = theme === 'pearl';

  // Customer Portal & Authenticated Guest State
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(FREQUENT_GUEST_PRESETS[0]);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register' | 'profile'>('signin');

  // Dedicated Chatbot States (Guest AI Butler & Partner Copilot AI)
  const [showGuestChatbot, setShowGuestChatbot] = useState<boolean>(false);
  const [showPartnerChatbot, setShowPartnerChatbot] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'landing' | 'stay' | 'move' | 'experience' | 'booking' | 'myjourney' | 'resolve'>('landing');
  const [showResolveModal, setShowResolveModal] = useState<boolean>(false);
  const [resolveCategory, setResolveCategory] = useState<string>('GENERAL_INQUIRY');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchDestination, setSearchDestination] = useState<string>('all');
  const [searchPropertyType, setSearchPropertyType] = useState<string>('all');
  const [searchTier, setSearchTier] = useState<string>('all');

  const [selectedEstate, setSelectedEstate] = useState<StayEstate>(PROPERTIES[0]);
  const [selectedVilla, setSelectedVilla] = useState<string>(PROPERTIES[0].villas[0].name);
  const [nights, setNights] = useState<number>(3);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState<string>('2026-09-12');
  
  // Transit & Sightseeing Selection
  const [transitMode, setTransitMode] = useState<'roundtrip' | 'pickup_only' | 'drop_only' | 'none'>('roundtrip');
  const [transferVehicle, setTransferVehicle] = useState<'sedan' | 'comfort_mpv' | 'electric' | 'defender' | 'maybach'>('sedan');
  const [arrivalFlightNumber, setArrivalFlightNumber] = useState<string>('6E-204');
  const [departureFlightNumber, setDepartureFlightNumber] = useState<string>('AI-678');
  const [selectedSightseeingIds, setSelectedSightseeingIds] = useState<string[]>(['goa-heritage']);

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
    { sender: 'butler', text: 'Namaste & Welcome! I am your dedicated StaySphere Concierge. How may I assist your upcoming trip today?', time: '14:02' },
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
    : 2400;
  
  const staySubtotal = currentVillaPrice * nights;

  // Vehicle pricing per leg (Sedan: ₹900, MPV: ₹1,600, EV: ₹2,400, Defender: ₹3,800, Maybach: ₹4,500)
  const vehiclePricePerLeg = 
    transferVehicle === 'maybach' ? 4500 : 
    transferVehicle === 'defender' ? 3800 : 
    transferVehicle === 'electric' ? 2400 : 
    transferVehicle === 'comfort_mpv' ? 1600 : 
    900;
  
  const pickupCost = transitMode === 'roundtrip' || transitMode === 'pickup_only' ? vehiclePricePerLeg : 0;
  const dropCost = transitMode === 'roundtrip' || transitMode === 'drop_only' ? vehiclePricePerLeg : 0;
  
  // Sightseeing sum
  const sightseeingCost = selectedSightseeingIds.reduce((sum, id) => {
    const tour = SIGHTSEEING_CATALOG.find((t) => t.id === id);
    return sum + (tour ? tour.price : 0);
  }, 0);

  // Roundtrip & Bundle discount
  const bundleDiscount = transitMode === 'roundtrip' && selectedSightseeingIds.length > 0 ? (selectedEstate?.tier === 'comfort' ? 400 : 1500) : 0;
  const travelSubtotal = pickupCost + dropCost + sightseeingCost - bundleDiscount;

  const rawTotal = staySubtotal + travelSubtotal;
  const promoDiscountAmount = appliedPromo ? Math.round((rawTotal * appliedPromo.discountPercent) / 100) : 0;
  const subtotalAfterDiscount = rawTotal - promoDiscountAmount;

  const hospitalityTaxes = Math.round(subtotalAfterDiscount * 0.12);
  const totalBill = subtotalAfterDiscount + hospitalityTaxes;

  const navigateToTab = (
    tab: 'landing' | 'stay' | 'move' | 'experience' | 'booking' | 'myjourney' | 'resolve',
    step: 1 | 2 | 3 = 1,
    estate?: StayEstate
  ) => {
    if (estate) {
      setSelectedEstate(estate);
      setSelectedVilla(estate.villas[0]?.name || '');
      if (estate.tier === 'comfort') {
        setTransferVehicle('sedan');
      } else if (estate.tier === 'premium') {
        setTransferVehicle('comfort_mpv');
      } else {
        setTransferVehicle('maybach');
      }
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

  const handleStartBooking = (estate: StayEstate) => {
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
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isPearl
          ? 'theme-pearl bg-[#F8FAFD] text-[#001E3D] selection:bg-[#00A9A5] selection:text-white'
          : 'bg-[#001428] text-slate-100 selection:bg-[#FF8A3D] selection:text-white'
      }`}
    >
      {/* Top Application Switcher Bar */}
      <div
        className={`border-b px-4 sm:px-8 py-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors ${
          isPearl
            ? 'bg-[#EEF2F6] border-slate-200 text-slate-600'
            : 'bg-[#000B17] border-white/10 text-slate-300'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Compass className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" />
          <span className="truncate sm:whitespace-normal">
            StaySphere Journey Platform:{' '}
            <strong className={isPearl ? 'text-[#001E3D]' : 'text-white'}>
              Coordinated Stays, Mobility & Proactive Resolution
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Customer Portal Button in Top Bar */}
          {currentUser ? (
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('profile');
                setShowAuthModal(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isPearl
                  ? 'bg-white border-[#D4AF37]/60 text-[#001E3D] shadow-sm hover:border-[#0B3D91]'
                  : 'bg-[#002B4D] border-[#FFC857]/40 text-[#FFC857] hover:brightness-110'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {currentUser.fullName}{' '}
                <span className="opacity-75">
                  ({currentUser.loyaltyTier.split(' ')[0]} • {currentUser.loyaltyPoints.toLocaleString()} pts)
                </span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signin');
                setShowAuthModal(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isPearl
                  ? 'bg-white border-slate-300 text-[#001E3D] hover:bg-slate-50'
                  : 'bg-[#002B4D] border-white/20 text-white hover:bg-[#003A66]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Sign-In / Sphere Club</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowPartnerChatbot(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap transition-all ${
              isPearl
                ? 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-950'
                : 'bg-[#002B4D] border-[#00A9A5]/40 text-[#00D2C4] hover:brightness-110'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" />
            <span>Partner Copilot AI ↗</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPartnerModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap transition-all ${
              isPearl
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-[#002B4D] border-[#00A9A5]/40 text-[#00D2C4] hover:brightness-110'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span>Partner Network ↗</span>
          </button>

          {/* Eye-Care Adaptive Theme Switcher */}
          <button
            type="button"
            onClick={() => setTheme(isPearl ? 'dark' : 'pearl')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap transition-all ${
              isPearl
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm'
                : 'bg-[#002B4D] border-slate-700 text-slate-200 hover:brightness-110'
            }`}
            title="Toggle Eye-Care Theme (Warm Pearl / Soft Slate)"
          >
            {isPearl ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Soft Slate</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Warm Pearl</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-3.5 transition-all shadow-md ${
          isPearl
            ? 'bg-white/95 border-slate-200/90 text-[#001E3D]'
            : 'bg-[#001830]/95 border-white/10 text-slate-100 shadow-2xl'
        }`}
      >
        <div className="w-full flex items-center justify-between gap-3">
          {/* Logo & Main Navigation - Left Aligned */}
          <div className="flex items-center gap-4 lg:gap-6 min-w-0">
            <div
              onClick={() => navigateToTab('landing')}
              className="cursor-pointer shrink-0"
            >
              <HorizontalLogo size="sm" variant={isPearl ? 'light' : 'dark'} />
            </div>

            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => navigateToTab('landing')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'landing'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : isPearl
                    ? 'text-slate-600 hover:text-[#001E3D] hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('stay')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'stay' || activeTab === 'booking'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : isPearl
                    ? 'text-slate-600 hover:text-[#001E3D] hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Hotel className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" />
                <span>Stay</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('move')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'move'
                    ? 'bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] shadow-md'
                    : isPearl
                    ? 'text-slate-600 hover:text-[#001E3D] hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-[#FF8A3D] shrink-0" />
                <span>Move</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('experience')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'experience'
                    ? 'bg-gradient-to-r from-[#FFC857] to-[#D4AF37] text-[#001428] shadow-md'
                    : isPearl
                    ? 'text-slate-600 hover:text-[#001E3D] hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#FFC857] shrink-0" />
                <span>Experience</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('myjourney')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'myjourney'
                    ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white shadow-md'
                    : isPearl
                    ? 'text-slate-600 hover:text-[#001E3D] hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Navigation className="w-3.5 h-3.5 text-[#3CCF91] shrink-0" />
                <span>My Journey</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToTab('resolve')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer border ${
                  activeTab === 'resolve'
                    ? 'bg-[#FF8A3D]/30 border-[#FF8A3D] text-[#FFC857] shadow-md'
                    : isPearl
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-[#FF8A3D]/15 hover:bg-[#FF8A3D]/25 border-[#FF8A3D]/40 text-[#FFC857]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF8A3D] shrink-0" />
                <span>Resolve</span>
              </button>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Guest AI Concierge Trigger */}
            <button
              type="button"
              onClick={() => setShowGuestChatbot(true)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isPearl
                  ? 'bg-gradient-to-r from-[#0B3D91] to-[#00A9A5] text-white hover:brightness-110 shadow-blue-950/10'
                  : 'bg-gradient-to-r from-[#00A9A5] to-[#0B3D91] text-white hover:brightness-110'
              }`}
              title="Open Guest AI Concierge & Butler"
            >
              <Bot className="w-3.5 h-3.5 text-[#FFC857]" />
              <span className="hidden sm:inline">Guest AI Butler</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'pearl' ? 'dark' : 'pearl')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isPearl
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-[#001E3D]'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
              title={`Switch to ${theme === 'pearl' ? 'Midnight Dark' : 'Light Pearl'} Theme`}
            >
              {isPearl ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden lg:inline">Light Pearl</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#00D2C4]" />
                  <span className="hidden lg:inline">Midnight Dark</span>
                </>
              )}
            </button>

            {/* Customer Portal Link Button */}
            <button
              type="button"
              onClick={() => {
                setAuthModalMode(currentUser ? 'profile' : 'signin');
                setShowAuthModal(true);
              }}
              className={`hidden sm:flex px-3.5 py-1.5 rounded-xl border text-xs font-black transition-all items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0 ${
                currentUser
                  ? isPearl
                    ? 'bg-amber-50/90 border-[#D4AF37]/50 text-amber-950 hover:bg-amber-100'
                    : 'bg-[#002B4D] border-[#FFC857]/50 text-[#FFC857] hover:brightness-110'
                  : isPearl
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-[#001E3D]'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{currentUser ? currentUser.fullName.split(' ')[0] : 'Customer Portal'}</span>
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
              
              <div
                className={`relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border ${
                  isPearl
                    ? 'bg-amber-50 text-amber-900 border-[#D4AF37]/50'
                    : 'bg-[#002B4D]/90 text-[#F3CA7E] border-[#E5B869]/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
                <span>All-Class Journey Platform — Smart, Premium & Luxe</span>
              </div>

              <h1
                className={`relative z-10 text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold tracking-tight max-w-5xl mx-auto leading-[1.15] ${
                  isPearl ? 'text-[#001E3D]' : 'text-white'
                }`}
              >
                Curated Stays, Connected Transit & Custody Protection. <br />
                <span className="gold-text-gradient italic font-normal">
                  For Every Traveler, Across Every Budget.
                </span>
              </h1>

              <p
                className={`relative z-10 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed font-light ${
                  isPearl ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                From verified budget homestays and serviced smart studios to boutique 4-star hotels, heritage palaces, and cliffside pool villas—seamlessly bundled with flight-synced cabs, local day tours, and proactive 15-minute Sentinel AI protection.
              </p>

              {/* Special Seasonal Promo Banner */}
              <div
                className={`relative z-10 max-w-3xl mx-auto p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left shadow-xl ${
                  isPearl
                    ? 'bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border-[#D4AF37]/50 text-[#001E3D]'
                    : 'bg-gradient-to-r from-[#002B4D] via-[#001E38] to-[#001428] border-[#E5B869]/40 text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFC857] to-[#FF8A3D] text-[#001428] font-black flex items-center justify-center shadow-md shrink-0">
                    <Tag className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black flex flex-wrap items-center gap-1.5">
                      <span className={isPearl ? 'text-[#001E3D]' : 'text-white'}>Welcome Launch Offer: Code "WELCOME10" or "MONSOON20"</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] text-[10px] font-bold border border-[#FFC857]/30 whitespace-nowrap shrink-0">ALL TIERS</span>
                    </div>
                    <span className={`text-[11px] block mt-0.5 ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>Enjoy up to 20% Off Stays + Guaranteed Airport Cab Synchronization</span>
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
              <div
                className={`relative z-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left ${
                  isPearl
                    ? 'bg-white/95 border-[#D4AF37]/40 shadow-[0_15px_35px_-5px_rgba(11,61,145,0.08)]'
                    : 'bg-[#030D1A]/95 border-[#E5B869]/30'
                }`}
              >
                <div>
                  <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${isPearl ? 'text-[#001E3D]' : 'text-[#F3CA7E]'}`}>
                    Destination
                  </label>
                  <select
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className={`w-full p-2.5 rounded-xl font-bold text-xs outline-none cursor-pointer border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-300 text-[#001E3D] focus:border-[#0B3D91]'
                        : 'bg-[#06182F] border-white/10 text-white focus:border-[#E5B869]'
                    }`}
                  >
                    <option value="all">All 6 Destinations</option>
                    <option value="Goa">Goa (Beach Homestays & Resorts)</option>
                    <option value="Bengaluru">Bengaluru (Smart Tech Studios)</option>
                    <option value="Jaipur">Jaipur (Heritage Havelis)</option>
                    <option value="Udaipur">Udaipur (Palace & Lake Stays)</option>
                    <option value="Manali">Manali (Valley & Snow Chalets)</option>
                    <option value="Mumbai">Mumbai (City & Sea Penthouses)</option>
                  </select>
                </div>

                <div>
                  <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${isPearl ? 'text-[#001E3D]' : 'text-[#F3CA7E]'}`}>
                    Travel Class / Tier
                  </label>
                  <select
                    value={searchTier}
                    onChange={(e) => setSearchTier(e.target.value)}
                    className={`w-full p-2.5 rounded-xl font-bold text-xs outline-none cursor-pointer border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-300 text-[#001E3D] focus:border-[#0B3D91]'
                        : 'bg-[#06182F] border-white/10 text-white focus:border-[#E5B869]'
                    }`}
                  >
                    <option value="all">All Classes & Budgets</option>
                    <option value="comfort">🟢 Smart & Comfort (₹1.8k–₹3.8k)</option>
                    <option value="premium">🔵 Premium Select (₹5.5k–₹10.5k)</option>
                    <option value="luxe">🟡 Signature Luxe (₹28k–₹65k)</option>
                  </select>
                </div>

                <div>
                  <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${isPearl ? 'text-[#001E3D]' : 'text-[#F3CA7E]'}`}>
                    Dates & Duration
                  </label>
                  <div
                    className={`flex items-center gap-1.5 p-2.5 rounded-xl text-xs font-bold border ${
                      isPearl
                        ? 'bg-slate-50 border-slate-300 text-[#001E3D]'
                        : 'bg-[#06182F] border-white/10 text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#00A9A5] shrink-0" />
                    <span className="whitespace-nowrap">Sep 12 – 15 (3 Nights)</span>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      let matched = PROPERTIES.find((p) => {
                        const matchCity = searchDestination === 'all' || p.destinationCity.toLowerCase() === searchDestination.toLowerCase();
                        const matchTier = searchTier === 'all' || p.tier === searchTier;
                        return matchCity && matchTier;
                      });
                      if (!matched) {
                        matched = PROPERTIES.find((p) => searchDestination === 'all' || p.destinationCity.toLowerCase() === searchDestination.toLowerCase()) || PROPERTIES[0];
                      }
                      navigateToTab('stay');
                    }}
                    className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#E5B869] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Search All Classes</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className={`relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs ${isPearl ? 'text-slate-700' : 'text-slate-300'}`}>
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" /> Milestone Custody Protection
                </span>
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <Car className="w-4 h-4 text-[#00D2C4] shrink-0" /> Flight-Synced Cabs (Sedan to Maybach)
                </span>
                <span className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                  <Compass className="w-4 h-4 text-[#FF8A3D] shrink-0" /> Curated Hosts & 5-Star Resorts
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
                  onClick={() => navigateToTab('stay')}  
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

            {/* Featured Destinations & Stays across All Classes */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#FF8A3D] uppercase tracking-widest">
                    Explore By Class & Budget
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Verified Stays Across All Categories & Tiers
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    From budget-friendly verified homestays to 5-star island palace resorts—all backed by safe escrow and connected transit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToTab('stay')}
                  className="text-xs font-bold text-[#00D2C4] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>View All 10 Properties in Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Tier Filter Pills on Landing */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setSelectedTier('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                    selectedTier === 'all'
                      ? 'bg-gradient-to-r from-[#00A9A5] to-[#00D2C4] text-[#001428] font-black shadow-lg'
                      : 'bg-[#001E38] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  All Classes ({PROPERTIES.length})
                </button>
                <button
                  onClick={() => setSelectedTier('comfort')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedTier === 'comfort'
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                      : 'bg-[#001E38] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>Smart & Comfort (₹1.8k–₹3.8k)</span>
                </button>
                <button
                  onClick={() => setSelectedTier('premium')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedTier === 'premium'
                      ? 'bg-sky-500 text-slate-950 font-black shadow-lg shadow-sky-500/20'
                      : 'bg-[#001E38] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span>Premium Select (₹5.5k–₹10.5k)</span>
                </button>
                <button
                  onClick={() => setSelectedTier('luxe')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedTier === 'luxe'
                      ? 'bg-[#FFC857] text-slate-950 font-black shadow-lg shadow-[#FFC857]/20'
                      : 'bg-[#001E38] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FFC857] shrink-0" />
                  <span>Signature Luxe (₹28k–₹65k)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {PROPERTIES.filter((p) => selectedTier === 'all' || p.tier === selectedTier).map((property) => (
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
                        <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[11px] font-black tracking-wide border whitespace-nowrap shrink-0 ${
                          property.tier === 'comfort'
                            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                            : property.tier === 'premium'
                            ? 'bg-sky-950/90 text-sky-300 border-sky-500/40'
                            : 'bg-[#002B4D]/90 text-[#F3CA7E] border-[#E5B869]/40'
                        }`}>
                          {property.tierLabel}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#002B4D]/90 backdrop-blur-md border border-white/15 text-slate-200 text-[11px] font-medium whitespace-nowrap shrink-0">
                          {property.propertyTypeLabel}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#020B18]/90 backdrop-blur-md border border-[#10B981]/40 text-[#10B981] text-[11px] font-bold flex items-center gap-1 whitespace-nowrap shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" /> {property.trustScore}% Verified
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-[#020B18]/90 backdrop-blur-md border border-[#FFC857]/40 text-[#FFC857] text-xs font-black flex items-center gap-1 shadow-lg whitespace-nowrap shrink-0">
                          <Star className="w-3.5 h-3.5 fill-[#FFC857]" /> {property.rating} ({property.reviewCount})
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="min-w-0 pr-3">
                          <span className="text-xs text-[#F3CA7E] flex items-center gap-1 font-medium truncate">
                            <MapPin className="w-3.5 h-3.5 text-[#FF8A3D] shrink-0" /> {property.location}
                          </span>
                          <h3 className="text-xl font-serif-luxury font-bold text-white mt-0.5 truncate">{property.name}</h3>
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
                          Curated Stay Inclusions:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {property.exclusiveInclusions.map((inclusion, idx) => (
                            <span key={idx} className="text-xs text-slate-200 flex items-center gap-1.5 min-w-0">
                              <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                              <span className="truncate">{inclusion}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-xs text-[#00D2C4] font-bold flex items-center gap-1 whitespace-nowrap shrink-0">
                          <Car className="w-4 h-4" /> Airport Cab + Local Sightseeing Ready
                        </span>

                        <button
                          type="button"
                          onClick={() => navigateToTab('booking', 1, property)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#E5B869] hover:brightness-110 text-[#001428] font-black text-xs shadow-lg shadow-[#FF8A3D]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <span>Book Stay & Transit</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>For Homestay Hosts, Boutique Hotels & Luxury Resorts</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Partner With StaySphere — List Any Accommodation Class
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Join India's unified travel marketplace. Enjoy automated escrow payouts, integrated airport taxi logistics, and zero booking friction across budget, premium, and luxury properties.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPartnerModal(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FFC857] to-[#FF8A3D] hover:brightness-110 text-[#001428] font-black text-xs shadow-xl shadow-[#FF8A3D]/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Register Your Property Now</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EXPLORE ALL-CLASS HOTELS, HOMESTAYS, RESORTS & SUITES              */}
        {/* ========================================================================= */}
        {activeTab === 'stay' && (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 pb-4 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#00D2C4] uppercase tracking-widest flex items-center gap-1">
                    <Hotel className="w-3.5 h-3.5" /> All-Class Verified Catalog
                  </span>
                  <h1 className="text-3xl font-black text-white mt-1">Homestays, Hotels, Resorts & Suites</h1>
                  <p className="text-xs text-slate-300 mt-1">
                    Every reservation includes safe milestone escrow custody, flight-synced airport cabs, and verified host support.
                  </p>
                </div>
              </div>

              {/* Dual Filter Controls: City & Tier */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                {/* City Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 whitespace-nowrap shrink-0">City:</span>
                  {['all', 'Goa', 'Bengaluru', 'Jaipur', 'Udaipur', 'Manali', 'Mumbai'].map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCategory(city.toLowerCase())}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                        selectedCategory === city.toLowerCase()
                          ? 'bg-[#00A9A5] text-white shadow-md'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {city === 'all' ? `All Cities (${PROPERTIES.length})` : city}
                    </button>
                  ))}
                </div>

                {/* Tier Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase mr-1 whitespace-nowrap shrink-0">Tier:</span>
                  {[
                    { key: 'all', label: 'All Classes' },
                    { key: 'comfort', label: '🟢 Smart Comfort' },
                    { key: 'premium', label: '🔵 Premium Select' },
                    { key: 'luxe', label: '🟡 Signature Luxe' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setSelectedTier(t.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                        selectedTier === t.key
                          ? 'bg-[#E5B869] text-slate-950 font-black shadow-md'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROPERTIES.filter((p) => {
                const matchCity = selectedCategory === 'all' || p.destinationCity.toLowerCase() === selectedCategory.toLowerCase();
                const matchTier = selectedTier === 'all' || p.tier === selectedTier;
                return matchCity && matchTier;
              }).map((property) => (
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
                      <span className={`px-3 py-1 rounded-full backdrop-blur-md text-[11px] font-black border whitespace-nowrap shrink-0 ${
                        property.tier === 'comfort'
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                          : property.tier === 'premium'
                          ? 'bg-sky-950/90 text-sky-300 border-sky-500/40'
                          : 'bg-[#002B4D]/90 text-[#F3CA7E] border-[#E5B869]/40'
                      }`}>
                        {property.tierLabel}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#002B4D]/90 backdrop-blur-md border border-white/15 text-slate-200 text-[11px] font-bold whitespace-nowrap shrink-0">
                        {property.propertyTypeLabel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#020B18]/90 backdrop-blur-md border border-[#FFC857]/40 text-[#FFC857] text-xs font-black flex items-center gap-1 shadow-lg whitespace-nowrap shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#FFC857]" /> {property.rating} ({property.reviewCount})
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="min-w-0 pr-3">
                        <span className="text-xs text-slate-300 flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#FF8A3D] shrink-0" /> {property.location}
                        </span>
                        <h3 className="text-xl font-black text-white mt-0.5 truncate">{property.name}</h3>
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
                        Available Room / Suite Categories:
                      </span>
                      <div className="space-y-1.5">
                        {property.villas.map((villa, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-[#001020] border border-white/5 flex items-center justify-between text-xs">
                            <span className="font-bold text-white truncate pr-2">{villa.name}</span>
                            <span className="text-[#00D2C4] font-black whitespace-nowrap shrink-0">₹{villa.price.toLocaleString()} / night</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-xs text-slate-400">
                        Airport / Hub: <strong className="text-slate-200">{property.destinationCity} Gate</strong>
                      </div>

                      <button
                        onClick={() => handleStartBooking(property)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] hover:brightness-110 text-[#001428] font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Book Stay, Cab & Tours</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Select Transit & Chauffeur Fleet (All Classes)
                        </label>
                        <span className="text-[11px] text-slate-400">Flight arrival tracking included</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div
                          onClick={() => setTransferVehicle('sedan')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'sedan'
                              ? 'bg-[#002B4D] border-emerald-400 shadow-md ring-1 ring-emerald-400'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">City AC Sedan</span>
                            <Car className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          </div>
                          <p className="text-[10px] text-slate-400">Dzire / Etios / Tigor EV, clean AC cab</p>
                          <span className="text-xs font-bold text-emerald-400 block">₹900 / leg</span>
                        </div>

                        <div
                          onClick={() => setTransferVehicle('comfort_mpv')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'comfort_mpv'
                              ? 'bg-[#002B4D] border-sky-400 shadow-md ring-1 ring-sky-400'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">Comfort MPV</span>
                            <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          </div>
                          <p className="text-[10px] text-slate-400">Innova Crysta / Ertiga, 6-seat family comfort</p>
                          <span className="text-xs font-bold text-sky-400 block">₹1,600 / leg</span>
                        </div>

                        <div
                          onClick={() => setTransferVehicle('electric')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'electric'
                              ? 'bg-[#002B4D] border-[#3CCF91] shadow-md ring-1 ring-[#3CCF91]'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">Executive EV Sedan</span>
                            <Zap className="w-3.5 h-3.5 text-[#3CCF91] shrink-0" />
                          </div>
                          <p className="text-[10px] text-slate-400">Whisper quiet luxury EV, executive lounge</p>
                          <span className="text-xs font-bold text-[#3CCF91] block">₹2,400 / leg</span>
                        </div>

                        <div
                          onClick={() => setTransferVehicle('defender')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'defender'
                              ? 'bg-[#002B4D] border-[#00A9A5] shadow-md ring-1 ring-[#00A9A5]'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">4x4 Mountain SUV</span>
                            <Mountain className="w-3.5 h-3.5 text-[#00D2C4] shrink-0" />
                          </div>
                          <p className="text-[10px] text-slate-400">Land Rover Defender / 4x4 all-terrain</p>
                          <span className="text-xs font-bold text-[#00D2C4] block">₹3,800 / leg</span>
                        </div>

                        <div
                          onClick={() => setTransferVehicle('maybach')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                            transferVehicle === 'maybach'
                              ? 'bg-[#002B4D] border-[#FFC857] shadow-md ring-1 ring-[#FFC857]'
                              : 'bg-[#001020] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-white">Maybach S680</span>
                            <Crown className="w-3.5 h-3.5 text-[#FFC857] shrink-0" />
                          </div>
                          <p className="text-[10px] text-slate-400">VIP tarmac meet, bottled water, champagne</p>
                          <span className="text-xs font-bold text-[#FFC857] block">₹4,500 / leg</span>
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
                        <span>🛡️ Hospitality GST & Escrow Fee (12%)</span>
                        <span className="font-bold text-white">₹{hospitalityTaxes.toLocaleString()}</span>
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
        {/* TAB: MOVE — Transport Fleet & Airport Transfer Explorer                  */}
        {/* ========================================================================= */}
        {activeTab === 'move' && (
          <div className="space-y-8">
            <div className="flex flex-col gap-2 pb-4 border-b border-white/10">
              <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${isPearl ? 'text-[#FF8A3D]' : 'text-[#FF8A3D]'}`}>
                <Car className="w-3.5 h-3.5" /> Flight-Synced Mobility
              </span>
              <h1 className={`text-3xl font-black mt-1 ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Move — Airport Transfers & City Mobility</h1>
              <p className={`text-xs mt-1 ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
                Every vehicle is flight-tracked. Your driver adjusts in real-time to delays, cancellations, and early arrivals.
              </p>
            </div>

            {/* Vehicle Fleet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'Sedan', label: 'Economy Sedan', icon: '🚖', price: 900, desc: 'Swift, comfortable city transfers. Maruti Ciaz / Honda City.', perks: ['AC', 'Flight tracking', '1–3 pax'], color: '#00A9A5' },
                { name: 'Comfort MPV', label: 'Comfort MPV', icon: '🚐', price: 1600, desc: 'Spacious Innova Crysta for families. 6–7 seats with luggage.', perks: ['AC', 'Flight tracking', 'Up to 6 pax'], color: '#3CCF91' },
                { name: 'Electric EV', label: 'Premium EV', icon: '⚡', price: 2400, desc: 'Silent, zero-emission luxury. BYD Atto 3 / Tata Nexon EV.', perks: ['Zero emission', 'Ambient lighting', 'USB-C charging'], color: '#00D2C4' },
                { name: 'Defender 4x4', label: 'Mountain Defender', icon: '🏔️', price: 3800, desc: 'Land Rover Defender 4x4 for mountain & hill routes.', perks: ['All-terrain', 'Snow-ready', 'Mountain routes'], color: '#FFC857' },
                { name: 'Maybach', label: 'Maybach Ultra-Luxe', icon: '👑', price: 4500, desc: 'Mercedes-Maybach S680. Champagne, privacy glass, personal host.', perks: ['Champagne service', 'Privacy glass', 'Personal escort'], color: '#D4AF37' },
              ].map((vehicle) => (
                <div
                  key={vehicle.name}
                  onClick={() => { navigateToTab('booking', 2, PROPERTIES[4]); }}
                  className={`rounded-3xl border p-6 space-y-4 cursor-pointer hover:scale-[1.02] transition-all group ${
                    isPearl
                      ? 'bg-white border-slate-200 hover:border-[#0B3D91] shadow-sm'
                      : 'bg-[#001E36] border-white/10 hover:border-white/30 shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{vehicle.icon}</div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border`} style={{ color: vehicle.color, borderColor: `${vehicle.color}40`, background: `${vehicle.color}15` }}>
                      FLIGHT-SYNCED
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-lg font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>{vehicle.label}</h3>
                    <p className={`text-xs mt-1 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>{vehicle.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {vehicle.perks.map((p) => (
                      <span key={p} className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isPearl ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-slate-300'}`}>{p}</span>
                    ))}
                  </div>
                  <div className={`pt-3 border-t flex items-center justify-between ${isPearl ? 'border-slate-100' : 'border-white/10'}`}>
                    <div>
                      <span className={`text-xl font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>₹{vehicle.price.toLocaleString()}</span>
                      <span className={`text-xs ml-1 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>/ leg</span>
                    </div>
                    <span className="text-xs font-black text-[#FF8A3D] group-hover:translate-x-1 transition-transform">Add to Journey →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Move + Stay CTA */}
            <div className={`rounded-3xl p-8 border text-center space-y-4 ${isPearl ? 'bg-gradient-to-r from-orange-50 to-white border-orange-200' : 'bg-gradient-to-r from-[#FF8A3D]/10 to-[#001E36] border-[#FF8A3D]/30'}`}>
              <h3 className={`text-xl font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Bundle Stay + Move for Best Price</h3>
              <p className={`text-xs max-w-lg mx-auto ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
                Select your stay first, then add round-trip airport transfers and sightseeing to one protected journey.
              </p>
              <button
                onClick={() => navigateToTab('stay')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF8A3D] to-[#FFC857] text-[#001428] font-black text-xs shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                <Hotel className="w-4 h-4" /> Choose Your Stay First
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: EXPERIENCE — Curated Sightseeing & Activities Catalog               */}
        {/* ========================================================================= */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="flex flex-col gap-2 pb-4 border-b border-white/10">
              <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${isPearl ? 'text-[#FFC857]' : 'text-[#FFC857]'}`}>
                <Compass className="w-3.5 h-3.5" /> Curated Experiences
              </span>
              <h1 className={`text-3xl font-black mt-1 ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Experience — Local Excursions & Tours</h1>
              <p className={`text-xs mt-1 ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
                Private sightseeing packages, adventure tours, cultural excursions and curated day trips — all part of your Journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SIGHTSEEING_CATALOG.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => { navigateToTab('booking', 2, PROPERTIES.find(p => p.destinationCity === tour.destinationCity) || PROPERTIES[0]); }}
                  className={`rounded-3xl border p-6 space-y-4 cursor-pointer hover:scale-[1.02] transition-all group ${
                    isPearl
                      ? 'bg-white border-slate-200 hover:border-[#FFC857] shadow-sm'
                      : 'bg-[#001E36] border-white/10 hover:border-[#FFC857]/50 shadow-xl'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border bg-[#FFC857]/15 text-[#FFC857] border-[#FFC857]/30 whitespace-nowrap shrink-0`}>
                      {tour.badge}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isPearl ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-slate-400'} whitespace-nowrap shrink-0`}>
                      {tour.destinationCity}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-base font-black leading-snug ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>{tour.name}</h3>
                    <p className={`text-[11px] mt-1.5 leading-relaxed ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>{tour.tagline}</p>
                  </div>
                  <div className="space-y-1">
                    {tour.highlights.slice(0, 3).map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-[#3CCF91] shrink-0" />
                        <span className={isPearl ? 'text-slate-600' : 'text-slate-300'}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`pt-3 border-t flex items-center justify-between ${isPearl ? 'border-slate-100' : 'border-white/10'}`}>
                    <div>
                      <div className={`text-[10px] ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>{tour.duration}</div>
                      <span className={`text-lg font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>₹{tour.price.toLocaleString()}</span>
                      <span className={`text-xs ml-1 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>/ group</span>
                    </div>
                    <span className="text-xs font-black text-[#FFC857] group-hover:translate-x-1 transition-transform">Add to Journey →</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={`rounded-3xl p-8 border text-center space-y-4 ${isPearl ? 'bg-gradient-to-r from-amber-50 to-white border-amber-200' : 'bg-gradient-to-r from-[#FFC857]/10 to-[#001E36] border-[#FFC857]/20'}`}>
              <h3 className={`text-xl font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Experiences are bundled into your Journey</h3>
              <p className={`text-xs max-w-lg mx-auto ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
                Add a sightseeing package to your stay booking. One payment, one protected journey.
              </p>
              <button
                onClick={() => navigateToTab('stay')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFC857] to-[#FF8A3D] text-[#001428] font-black text-xs shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                <Hotel className="w-4 h-4" /> Browse Stays & Bundle Experiences
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MY JOURNEY (SYNCHRONIZED TIMELINE & PROACTIVE RESOLVE SENTINEL)   */}
        {/* ========================================================================= */}
        {activeTab === 'myjourney' && (
          <MyJourneyView
            onOpenResolve={(cat) => {
              setResolveCategory(cat || 'GENERAL_INQUIRY');
              setShowResolveModal(true);
            }}
            theme={theme}
            currentUser={currentUser}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RESOLVE — Journey Protection & 15-Min SLA Desk                   */}
        {/* ========================================================================= */}
        {activeTab === 'resolve' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Resolve header */}
            <div className={`rounded-3xl p-6 border shadow-xl ${isPearl ? 'bg-amber-50 border-amber-200' : 'bg-gradient-to-r from-[#FF8A3D]/10 to-[#001E36] border-[#FF8A3D]/30'}`}>
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-[#FF8A3D]" />
                <h1 className={`text-2xl font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>Resolve — Journey Protection</h1>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">15-Min SLA Guarantee</span>
              </div>
              <p className={`text-xs ${isPearl ? 'text-slate-600' : 'text-slate-300'}`}>
                Report any issue with your stay, transport, or experience. Our Sentinel AI tracks and resolves within 15 minutes.
              </p>
            </div>

            {/* Issue category grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { cat: 'PRE_ARRIVAL', icon: Plane, label: 'Pre-Arrival Issue', desc: 'Flight change, driver delay, property problem before check-in', color: '#00A9A5' },
                { cat: 'CHECKIN_ISSUE', icon: Hotel, label: 'Check-In Problem', desc: 'Room not ready, wrong room category, facilities issue', color: '#7C6DF2' },
                { cat: 'IN_STAY', icon: AlertTriangle, label: 'In-Stay Issue', desc: 'AC, housekeeping, maintenance, noise, security concern', color: '#FF8A3D' },
                { cat: 'TRANSPORT_DELAY', icon: Car, label: 'Transport Delay', desc: 'Driver late, wrong vehicle, route issue or breakdown', color: '#FFC857' },
                { cat: 'PAYMENT_ISSUE', icon: CreditCard, label: 'Payment / Billing', desc: 'Overcharge, receipt mismatch, refund or escrow query', color: '#3CCF91' },
                { cat: 'GENERAL_INQUIRY', icon: HelpCircle, label: 'General Inquiry', desc: 'Anything else — our team responds in under 15 minutes', color: '#D4AF37' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.cat}
                    onClick={() => { setResolveCategory(item.cat); setShowResolveModal(true); }}
                    className={`text-left p-5 rounded-2xl border transition-all group cursor-pointer hover:scale-[1.02] ${
                      isPearl
                        ? 'bg-white border-slate-200 hover:border-[#0B3D91] shadow-sm'
                        : 'bg-[#001E36] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}20` }}>
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm font-black ${isPearl ? 'text-[#001E3D]' : 'text-white'}`}>{item.label}</div>
                        <div className={`text-[11px] mt-0.5 ${isPearl ? 'text-slate-500' : 'text-slate-400'}`}>{item.desc}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-[11px] font-bold flex items-center gap-1" style={{ color: item.color }}>
                      Open Resolve Desk <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SLA promise strip */}
            <div className={`rounded-2xl p-5 border text-center ${isPearl ? 'bg-slate-50 border-slate-200' : 'bg-[#001428] border-white/5'}`}>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
                {[
                  { icon: Clock, label: '15-Min SLA', color: '#3CCF91' },
                  { icon: ShieldCheck, label: 'Milestone Escrow Hold', color: '#00A9A5' },
                  { icon: Users, label: '24/7 Sentinel Team', color: '#FFC857' },
                  { icon: CheckCircle2, label: 'Guaranteed Resolution', color: '#FF8A3D' },
                ].map(({ icon: Icon, label, color }) => (
                  <span key={label} className="flex items-center gap-1.5 font-bold" style={{ color }}>
                    <Icon className="w-3.5 h-3.5 shrink-0" /> {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Triggers (Guest AI Butler, Partner Copilot & Proactive Resolve Sentinel) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        {/* Partner Copilot Quick Trigger */}
        <button
          type="button"
          onClick={() => setShowPartnerChatbot(true)}
          className="group px-3.5 py-2.5 rounded-full bg-[#001830]/95 hover:bg-[#002850] text-[#00D2C4] font-black text-xs shadow-xl shadow-cyan-950/40 hover:scale-105 transition-all flex items-center gap-2 border border-[#00A9A5]/40 backdrop-blur cursor-pointer"
          title="Open Partner Operations Copilot AI"
        >
          <Bot className="w-4 h-4 text-[#00A9A5]" />
          <span className="hidden md:inline">Partner Copilot AI</span>
        </button>

        {/* Guest AI Butler Trigger */}
        <button
          type="button"
          onClick={() => setShowGuestChatbot(true)}
          className="group px-4 py-3 rounded-full bg-gradient-to-r from-[#0B3D91] via-[#00A9A5] to-[#D4AF37] text-white font-black text-xs shadow-2xl shadow-[#00A9A5]/40 hover:scale-105 transition-all flex items-center gap-2 border-2 border-white/30 cursor-pointer"
          title="Open Guest AI Concierge & In-Suite Butler"
        >
          <div className="relative">
            <Crown className="w-4 h-4 text-[#FFC857]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFC857] animate-ping" />
          </div>
          <span>Guest AI Butler</span>
          <span className="px-2 py-0.5 rounded-full bg-black/60 text-[#FFC857] text-[10px] font-extrabold font-mono">
            24/7 Concierge
          </span>
        </button>

        {/* Proactive Resolve Sentinel Trigger */}
        <button
          type="button"
          onClick={() => {
            setResolveCategory('GENERAL_INQUIRY');
            setShowResolveModal(true);
          }}
          className="group px-4 py-3 rounded-full bg-gradient-to-r from-[#FF8A3D] via-[#FFC857] to-[#00A9A5] text-[#001428] font-black text-xs shadow-2xl shadow-[#FF8A3D]/40 hover:scale-105 transition-all flex items-center gap-2 border-2 border-white/20 cursor-pointer"
          title="Proactive Resolution Desk (15-Minute SLA Guarantee)"
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

      {/* Guest AI Concierge & Butler Chatbot Modal */}
      <GuestChatbotModal
        isOpen={showGuestChatbot}
        onClose={() => setShowGuestChatbot(false)}
        theme={theme}
        currentUser={currentUser}
        onOpenResolve={(cat) => {
          setResolveCategory(cat || 'GENERAL_INQUIRY');
          setShowResolveModal(true);
        }}
      />

      {/* Partner Operations Copilot AI Modal */}
      <PartnerChatbotModal
        isOpen={showPartnerChatbot}
        onClose={() => setShowPartnerChatbot(false)}
        theme={theme}
      />

      {/* Customer Authentication & Sovereign Member Portal Modal */}
      <CustomerAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
        }}
        onLogout={() => {
          setCurrentUser(null);
        }}
        theme={theme}
        initialMode={authModalMode}
      />

      {/* Proactive Resolution Sentinel Modal */}
      <ProactiveResolveSentinel
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        defaultCategory={resolveCategory}
        journeyReference={confirmedBookingId ? `JN-SS-2026-${confirmedBookingId.replace(/\D/g, '') || '9041'}` : 'JN-SS-2026-9041'}
        theme={theme}
      />

      {/* Partner Registration Multi-Stakeholder Modal */}
      <PartnerRegistrationModal
        isOpen={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
        theme={theme}
      />

      {/* Footer */}
      <footer
        className={`border-t py-8 px-4 sm:px-8 text-xs mt-16 transition-colors ${
          isPearl
            ? 'bg-[#EEF2F6] border-slate-200 text-slate-600'
            : 'bg-[#001020] border-white/10 text-slate-400'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HorizontalLogo size="sm" variant={isPearl ? 'light' : 'dark'} />
            <span className="text-slate-400">|</span>
            <span>Coordinated Stays, Travel & Protected Payments</span>
          </div>

          <div className="flex items-center gap-6">
            <span className={isPearl ? 'text-slate-500' : 'text-slate-400'}>
              © 2026 StaySphere Journey Platform Pvt. Ltd.
            </span>
            <button
              type="button"
              onClick={() => {
                setAuthModalMode(currentUser ? 'profile' : 'signin');
                setShowAuthModal(true);
              }}
              className="text-[#00A9A5] font-bold hover:underline cursor-pointer"
            >
              {currentUser ? `Sphere Portal (${currentUser.fullName.split(' ')[0]})` : 'Customer Portal'}
            </button>
            <button
              type="button"
              onClick={() => setShowPartnerModal(true)}
              className="text-[#FF8A3D] font-bold hover:underline cursor-pointer"
            >
              Partner Network
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
