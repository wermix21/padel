
export interface Racket {
  id: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: 'Power' | 'Control' | 'Hybrid';
  models?: string[];
}

export interface BookingDetails {
  racketId: string;
  date: string;
  startTime: string;
  duration: number; // in hours
  name: string;
}

export enum SessionStatus {
  IDLE = 'idle',
  BOOKING = 'booking',
  CONFIRMING = 'confirming'
}
