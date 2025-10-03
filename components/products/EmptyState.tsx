import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No products found matching your filters.' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="font-semibold text-lg mb-2">No products found</h3>
      <p className="text-muted-foreground max-w-md">
        {message}
      </p>
    </div>
  );
}
