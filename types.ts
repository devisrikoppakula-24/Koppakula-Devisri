
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENUE_OWNER = 'VENUE_OWNER',
  EVENT_MANAGER = 'EVENT_MANAGER',
  ADMIN = 'ADMIN'
}

export type AvailabilityStatus = 'AVAILABLE' | 'BOOKED' | 'PENDING';

export interface Venue {
  id: string;
  name: string;
  type: 'HOTEL' | 'CONVENTION_HALL' | 'RESTAURANT';
  capacity: number;
  pricePerDay: number;
  location: string;
  rating: number;
  imageUrl: string;
  gallery: string[];
  videoUrl?: string;
  description?: string;
  isVerified: boolean;
  availability: Record<string, AvailabilityStatus>; // date string "YYYY-MM-DD"
}

export interface Service {
  id: string;
  name: string;
  category: 'CATERING' | 'DECOR' | 'DANCE' | 'MAKEUP' | 'PHOTO' | 'STAFF' | 'MANAGER';
  price: number;
  provider: string;
  imageUrl: string;
  gallery: string[];
  videoUrl?: string;
  description: string;
  rating: number;
  availability: Record<string, AvailabilityStatus>;
}

export interface Booking {
  id: string;
  userId: string;
  venueId?: string;
  venueName?: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalPrice: number;
  services: string[]; // array of service names
}
