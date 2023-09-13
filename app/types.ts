import { Brand, Category, Color, Gender, Size } from '@prisma/client';
import { LucideIcon } from 'lucide-react';

export interface Products {
  id: string;
  name: string;
  brand: Brand;
  gender: Gender;
  category: Category;
  price: number;
  isFeatured: boolean;
  imageUrl: string;
  isNew: boolean;
  color: Color;
  description: string;
  size: Size;
}

export interface ProfileProps {
  id: string;
  userId: string;
  email: string;
  role: string;
  name: string;
  imageUrl: string | null;
}

export interface RoutesProps {
  label: string;
  href: string;
  active: boolean;
  icon: JSX.Element;
}
