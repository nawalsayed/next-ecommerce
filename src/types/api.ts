export interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  imageCover: string;
  images?: string[];
  category?: { name: string };
}

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
}
