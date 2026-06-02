export interface PosterCustomization {
  id?: string;
  type: 'stars' | 'city' | 'pet' | 'music' | 'car';
  title: string;
  subtitle: string;
  dateString: string;
  location: string;
  theme: 'night' | 'black' | 'gold' | 'cream';
  size: '30x40' | '40x50' | '50x70' | 'A3';
  hasFrame: boolean;
  petStyle?: 'royal' | 'popart';
  passionTheme?: 'music' | 'car' | 'sports';
  quantity: number;
  hasPremiumSeal?: boolean;
  hasInsurance?: boolean;
  hasGiftWrap?: boolean;
  selectedPackage?: 'solo' | 'duo' | 'trio';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  productType: string;
  initials: string;
}

export interface CartItem {
  id: string;
  productName: string;
  price: number;
  customization: PosterCustomization;
}
