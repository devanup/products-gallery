import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export const CategorySchema = z.string();

export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;

export interface Filters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: SortOption;
}

export type SortOption = 'none' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface CategoryCount {
  name: string;
  count: number;
}
