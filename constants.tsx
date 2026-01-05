
import { Venue, Service } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Grand Royal Plaza',
    type: 'HOTEL',
    capacity: 500,
    pricePerDay: 2500,
    location: 'Mumbai, MH',
    rating: 4.8,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1000'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'The Grand Royal Plaza offers a majestic setting for your special day. With state-of-the-art acoustics and a luxurious grand ballroom, we ensure every moment is memorable.',
    availability: {
      '2024-12-25': 'BOOKED',
      '2024-12-26': 'PENDING',
      '2024-12-27': 'AVAILABLE'
    }
  },
  {
    id: 'v2',
    name: 'Sapphire Convention Center',
    type: 'CONVENTION_HALL',
    capacity: 1200,
    pricePerDay: 4500,
    location: 'Bangalore, KA',
    rating: 4.9,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000'
    ],
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'A sprawling modern space perfect for corporate summits, large-scale weddings, and tech conferences.',
    availability: {
      '2024-12-25': 'AVAILABLE',
      '2024-12-31': 'BOOKED'
    }
  },
  {
    id: 'v3',
    name: 'The Garden Bistro',
    type: 'RESTAURANT',
    capacity: 150,
    pricePerDay: 800,
    location: 'Delhi, NCR',
    rating: 4.5,
    isVerified: false,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'An intimate open-air dining space surrounded by lush greenery. Ideal for birthday parties and engagement dinners.',
    availability: {}
  }
];

export const MOCK_SERVICES: Service[] = [
  { 
    id: 's1', 
    name: 'Royal Feast Catering', 
    category: 'CATERING', 
    price: 45, 
    provider: 'TasteMasters', 
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=500',
    gallery: ['https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=500'],
    description: 'Exquisite multi-cuisine buffet with 50+ dishes. We specialize in authentic regional flavors and international delicacies.',
    rating: 4.7,
    availability: { '2024-12-25': 'BOOKED' }
  },
  { 
    id: 's2', 
    name: 'Glamour Glow Studio', 
    category: 'MAKEUP', 
    price: 200, 
    provider: 'Anita Makeup', 
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500',
    gallery: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500'],
    description: 'Bridal and party makeup by celebrity artists. We use only high-end products to ensure you look stunning.',
    rating: 4.9,
    availability: {}
  },
  { 
    id: 's3', 
    name: 'Bollywood Beats Troupe', 
    category: 'DANCE', 
    price: 600, 
    provider: 'Rhythm Academy', 
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=500',
    gallery: ['https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=500'],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Energetic group dances for weddings and receptions. Our troupe brings the magic of Bollywood to your stage.',
    rating: 4.8,
    availability: {}
  },
  { 
    id: 's6', 
    name: 'Eternal Blooms Decor', 
    category: 'DECOR', 
    price: 1200, 
    provider: 'Royal Themes', 
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=500',
    gallery: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=500'],
    description: 'Custom floral arrangements, lighting, and theme setups. We turn your vision into a reality with breathtaking decor.',
    rating: 4.9,
    availability: {}
  },
  { 
    id: 's4', 
    name: 'Elite Event Coordination', 
    category: 'MANAGER', 
    price: 1500, 
    provider: 'PlanPerfect', 
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500',
    gallery: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500'],
    description: 'End-to-end management so you can enjoy your event. From guest lists to vendor coordination, we handle it all.',
    rating: 5.0,
    availability: {}
  },
  { 
    id: 's5', 
    name: 'Professional Food Servants', 
    category: 'STAFF', 
    price: 50, 
    provider: 'ServeRight', 
    imageUrl: 'https://images.unsplash.com/photo-1595475038784-bbe47385573a?auto=format&fit=crop&q=80&w=500',
    gallery: ['https://images.unsplash.com/photo-1595475038784-bbe47385573a?auto=format&fit=crop&q=80&w=500'],
    description: 'Experienced staff for high-end hospitality services. Courteous, professional, and efficient.',
    rating: 4.6,
    availability: {}
  }
];
