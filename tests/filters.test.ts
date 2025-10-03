import { describe, it, expect } from 'vitest';
import {
  applySearch,
  applyCategory,
  applyPriceRange,
  applyMinRating,
  sortProducts,
  applyFilters,
  getCategoryCounts,
  getPriceRange,
} from '@/lib/filters';
import { Product } from '@/lib/types';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Laptop Computer',
    price: 999,
    description: 'High-performance laptop for work',
    category: 'electronics',
    image: 'laptop.jpg',
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: 'Wireless Mouse',
    price: 25,
    description: 'Ergonomic wireless mouse',
    category: 'electronics',
    image: 'mouse.jpg',
    rating: { rate: 4.2, count: 80 },
  },
  {
    id: 3,
    title: 'Cotton T-Shirt',
    price: 15,
    description: 'Comfortable cotton t-shirt',
    category: 'clothing',
    image: 'shirt.jpg',
    rating: { rate: 3.8, count: 50 },
  },
  {
    id: 4,
    title: 'Running Shoes',
    price: 89,
    description: 'Lightweight running shoes',
    category: 'clothing',
    image: 'shoes.jpg',
    rating: { rate: 4.7, count: 200 },
  },
];

describe('Filter Functions', () => {
  describe('applySearch', () => {
    it('should filter products by title', () => {
      const result = applySearch(mockProducts, 'laptop');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Laptop Computer');
    });

    it('should filter products by description', () => {
      const result = applySearch(mockProducts, 'ergonomic');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Wireless Mouse');
    });

    it('should be case insensitive', () => {
      const result = applySearch(mockProducts, 'LAPTOP');
      expect(result).toHaveLength(1);
    });

    it('should return all products for empty search', () => {
      const result = applySearch(mockProducts, '');
      expect(result).toHaveLength(4);
    });
  });

  describe('applyCategory', () => {
    it('should filter products by category', () => {
      const result = applyCategory(mockProducts, 'electronics');
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.category === 'electronics')).toBe(true);
    });

    it('should return all products for empty category', () => {
      const result = applyCategory(mockProducts, '');
      expect(result).toHaveLength(4);
    });
  });

  describe('applyPriceRange', () => {
    it('should filter products within price range', () => {
      const result = applyPriceRange(mockProducts, 20, 90);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.price >= 20 && p.price <= 90)).toBe(true);
    });

    it('should include products at exact price boundaries', () => {
      const result = applyPriceRange(mockProducts, 15, 89);
      expect(result).toHaveLength(3);
    });
  });

  describe('applyMinRating', () => {
    it('should filter products by minimum rating', () => {
      const result = applyMinRating(mockProducts, 4.5);
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.rating.rate >= 4.5)).toBe(true);
    });

    it('should return all products for rating 0', () => {
      const result = applyMinRating(mockProducts, 0);
      expect(result).toHaveLength(4);
    });
  });

  describe('sortProducts', () => {
    it('should sort by price ascending', () => {
      const result = sortProducts(mockProducts, 'price-asc');
      expect(result[0].price).toBe(15);
      expect(result[result.length - 1].price).toBe(999);
    });

    it('should sort by price descending', () => {
      const result = sortProducts(mockProducts, 'price-desc');
      expect(result[0].price).toBe(999);
      expect(result[result.length - 1].price).toBe(15);
    });

    it('should sort by rating descending', () => {
      const result = sortProducts(mockProducts, 'rating-desc');
      expect(result[0].rating.rate).toBe(4.7);
    });

    it('should not change order for none sort', () => {
      const result = sortProducts(mockProducts, 'none');
      expect(result[0].id).toBe(1);
    });
  });

  describe('applyFilters', () => {
    it('should apply multiple filters together', () => {
      const filters = {
        search: '',
        category: 'electronics',
        minPrice: 20,
        maxPrice: 1000,
        minRating: 4.0,
        sort: 'price-asc' as const,
      };

      const result = applyFilters(mockProducts, filters);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Wireless Mouse');
      expect(result[1].title).toBe('Laptop Computer');
    });
  });

  describe('getCategoryCounts', () => {
    it('should count products per category', () => {
      const result = getCategoryCounts(mockProducts);
      expect(result).toHaveLength(2);
      expect(result.find((c) => c.name === 'electronics')?.count).toBe(2);
      expect(result.find((c) => c.name === 'clothing')?.count).toBe(2);
    });
  });

  describe('getPriceRange', () => {
    it('should return min and max prices', () => {
      const result = getPriceRange(mockProducts);
      expect(result.min).toBe(15);
      expect(result.max).toBe(999);
    });

    it('should return default range for empty array', () => {
      const result = getPriceRange([]);
      expect(result).toEqual({ min: 0, max: 1000 });
    });
  });
});
