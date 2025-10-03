import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '@/lib/api';

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
