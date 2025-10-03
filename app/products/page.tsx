import { Suspense } from 'react';
import { ProductsClient } from './ProductsClient';
import { SkeletonGrid } from '@/components/products/SkeletonCard';

export const metadata = {
  title: 'Products | StoreFront',
  description: 'Browse our collection of quality products',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<SkeletonGrid />}>
      <ProductsClient />
    </Suspense>
  );
}
