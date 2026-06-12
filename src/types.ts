export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'favourites' | 'loaves' | 'buns' | 'muffins' | 'celebration';
  tags: string[];
  isFav?: boolean;
  image: string;
  altText?: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  isUserSubmitted?: boolean;
}

export interface CustomOrderResult {
  estimatedPrice: number;
  bakeTimeHours: number;
  ingredientsHighlight: string[];
}

export interface CartItem {
  id: string; // unique combined id if same items have different options/customizations
  item: MenuItem;
  quantity: number;
  customNotes?: string;
}
