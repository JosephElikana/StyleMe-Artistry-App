export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  dimensions: string;
  year: number;
  orientation: 'portrait' | 'landscape';
}

export interface CartItem extends Artwork {
  cartId: string; // Unique ID for cart item in case of duplicates (though art is usually 1 of 1)
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc';
