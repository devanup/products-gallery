import { z } from 'zod';
import { Product, ProductSchema, Category, CategorySchema } from './types';

const API_BASE = 'https://fakestoreapi.com';

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithValidation<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError('Invalid data format received from API');
    }
    throw error;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  return fetchWithValidation(
    `${API_BASE}/products`,
    z.array(ProductSchema)
  );
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchWithValidation(
    `${API_BASE}/products/categories`,
    z.array(CategorySchema)
  );
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  return fetchWithValidation(
    `${API_BASE}/products/category/${encodeURIComponent(category)}`,
    z.array(ProductSchema)
  );
}
