export interface Review {
    id: string;
    rating: number;
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
  