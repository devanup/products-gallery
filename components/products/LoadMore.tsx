import { Button } from '@/components/ui/button';

interface LoadMoreProps {
  onClick: () => void;
  hasMore: boolean;
}

export function LoadMore({ onClick, hasMore }: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center py-8">
      <Button onClick={onClick} variant="outline" size="lg">
        Load More Products
      </Button>
    </div>
  );
}
