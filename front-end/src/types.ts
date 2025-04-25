export interface Review {
  id: string;
  rating: number;
  content: string; // ✅ this was missing
  author: {
    name: string;
  };
}
  
export interface Game {
  id: string;
  title: string;
  platform: string[];
  reviews: Review[];
}
