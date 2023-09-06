export interface Products {
  id: number;
  name: string;
  brand: string;
  gender: string;
  category: string;
  price: number;
  is_in_inventory: boolean;
  items_left: number;
  imageURL: string;
  slug: string;
  featured: boolean;
}

export interface ProfileProps {
  id: string;
  userId: string;
  email: string;
  role: string;
  name: string;
  imageUrl: string;
}
