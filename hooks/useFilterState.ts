'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filters, SortOption } from '@/lib/types';

export function useFilterState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = useMemo(() => {
    return {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: Number(searchParams.get('min')) || 0,
      maxPrice: Number(searchParams.get('max')) || 1000,
      minRating: Number(searchParams.get('rating')) || 0,
      sort: (searchParams.get('sort') as SortOption) || 'none',
    };
  }, [searchParams]);

  const take = Number(searchParams.get('take')) || 9;

  const updateFilters = useCallback(
    (updates: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams.toString());

      const newFilters = { ...filters, ...updates };

      if (newFilters.search) {
        params.set('search', newFilters.search);
      } else {
        params.delete('search');
      }

      if (newFilters.category) {
        params.set('category', newFilters.category);
      } else {
        params.delete('category');
      }

      if (newFilters.minPrice > 0) {
        params.set('min', newFilters.minPrice.toString());
      } else {
        params.delete('min');
      }

      if (newFilters.maxPrice < 1000) {
        params.set('max', newFilters.maxPrice.toString());
      } else {
        params.delete('max');
      }

      if (newFilters.minRating > 0) {
        params.set('rating', newFilters.minRating.toString());
      } else {
        params.delete('rating');
      }

      if (newFilters.sort !== 'none') {
        params.set('sort', newFilters.sort);
      } else {
        params.delete('sort');
      }

      params.delete('take');

      const queryString = params.toString();
      router.push(queryString ? `/products?${queryString}` : '/products', {
        scroll: false,
      });
    },
    [filters, searchParams, router]
  );

  const updateTake = useCallback(
    (newTake: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('take', newTake.toString());
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const clearFilters = useCallback(() => {
    router.push('/products', { scroll: false });
  }, [router]);

  return {
    filters,
    take,
    updateFilters,
    updateTake,
    clearFilters,
  };
}
