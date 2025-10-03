import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, formatRating } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Badge variant="secondary" className="capitalize text-xs">
            {product.category}
          </Badge>
          <h3 className="font-medium text-sm line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{formatRating(product.rating.rate)}</span>
            <span className="text-muted-foreground">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
