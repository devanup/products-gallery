import { Product, Filters, SortOption, CategoryCount } from './types';

export function applySearch(products: Product[], search: string): Product[] {
  if (!search.trim()) return products;

  const query = search.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );
}

export function applyCategory(products: Product[], category: string): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function applyPriceRange(
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
}

export function applyMinRating(products: Product[], minRating: number): Product[] {
  return products.filter((p) => p.rating.rate >= minRating);
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return sorted;
  }
}

export function applyFilters(products: Product[], filters: Filters): Product[] {
  let filtered = products;

  filtered = applySearch(filtered, filters.search);
  filtered = applyCategory(filtered, filters.category);
  filtered = applyPriceRange(filtered, filters.minPrice, filters.maxPrice);
  filtered = applyMinRating(filtered, filters.minRating);
  filtered = sortProducts(filtered, filters.sort);

  return filtered;
}

export function getCategoryCounts(products: Product[]): CategoryCount[] {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    const count = counts.get(product.category) || 0;
    counts.set(product.category, count + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 1000 };

  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}
