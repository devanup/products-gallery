# Products Gallery - FakeStore API Integration

A simple Next.js application showcasing a filterable products gallery with elegant UI and comprehensive testing.

## Features

- **Advanced Filtering System**
  - Search products by title and description (debounced 300ms)
  - Filter by category with real-time counts
  - Price range slider
  - Minimum rating filter
  - Sort by price and rating
  - URL-synced state for shareable filters

- **Responsive Design**
  - Desktop: Expandable/collapsible sidebar filters
  - Mobile: Accessible slide-in drawer with focus trap
  - Grid layout adapts to viewport size
  - Lazy-loaded images with proper aspect ratios

- **Progressive Loading**
  - Initial load: 9 products
  - "Load More" button adds 9 products at a time
  - Skeleton loading states
  - Error states with retry functionality

<!-- - **Accessibility**
  - Keyboard navigation support
  - WCAG AA color contrast
  - Proper ARIA labels and roles
  - Focus management in modal/drawer
  - ESC key to close drawer -->

- **Production Quality**
  - TypeScript with strict mode
  - Zod runtime validation
  - React Query for efficient data fetching
  - Comprehensive unit tests (Vitest)
  - E2E tests (Playwright)
  - Pre-commit hooks (Husky + lint-staged)
  <!-- - CI/CD ready (GitHub Actions) -->

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS with shadcn/ui
- **Data Fetching**: @tanstack/react-query
- **Validation**: Zod
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Code Quality**: ESLint, Prettier, Husky

<!-- ## Project Structure

```
/app
  /products
    page.tsx                 # Server component with metadata
    ProductsClient.tsx       # Client component with filters & grid
/components
  Header.tsx                 # Navigation header
  /products
    ControlsBar.tsx          # Search, filter toggle, sort
    SidebarFilters.tsx       # Category, price, rating filters
    ProductGrid.tsx          # Responsive product grid
    ProductCard.tsx          # Individual product card
    LoadMore.tsx             # Pagination button
    Drawer.tsx               # Accessible mobile filter drawer
    SkeletonCard.tsx         # Loading skeletons
    EmptyState.tsx           # No results message
    ErrorState.tsx           # Error with retry
  /providers
    QueryProvider.tsx        # React Query setup
/hooks
  useProductsQuery.ts        # React Query hooks
  useFilterState.ts          # URL-synced filter state
/lib
  api.ts                     # API fetchers with Zod validation
  types.ts                   # TypeScript types
  filters.ts                 # Pure filter functions
  utils.ts                   # Utility functions
/tests
  filters.test.ts            # Unit tests for filters
  utils.test.ts              # Unit tests for utils
  /e2e
    products.spec.ts         # Playwright e2e tests
``` -->

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building

```bash
npm run build
npm run start
```

## Testing

### Unit Tests

```bash
npm run test        # Watch mode
npm run test:run    # Run once
npm run test:ui     # Visual test UI
```

### E2E Tests

```bash
npm run test:e2e       # Headless
npm run test:e2e:ui    # Interactive UI
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## API Integration

This app uses the [FakeStore API](https://fakestoreapi.com/):

- `GET /products` - All products
- `GET /products/categories` - Available categories
- `GET /products/category/{name}` - Products by category

Data is fetched client-side via React Query with:

- Automatic caching (5 min stale time)
- Retry logic (2 attempts)
- Optimistic UI updates

## Key Design Decisions

### Architecture

1. **Server/Client Split**: Server Components for metadata and initial data, Client Components for interactivity
2. **URL as State**: All filters persist in URL for shareable links and browser back/forward
3. **Client-side Filtering**: Fetch all products once, filter in memory for instant interactions
4. **Progressive Enhancement**: Works without JavaScript for basic functionality

### Performance

1. **React Query Caching**: Prevents unnecessary refetches
2. **Debounced Search**: 300ms delay reduces API calls and re-renders
3. **Lazy Image Loading**: Images load progressively with proper sizing
4. **Code Splitting**: Automatic route-based splitting via Next.js

<!-- ### Accessibility

1. **Keyboard Navigation**: All controls accessible via keyboard
2. **Focus Trapping**: Drawer captures focus and returns to trigger on close
3. **ARIA Labels**: Proper labeling for screen readers
4. **Color Contrast**: WCAG AA compliant -->

### Testing Strategy

1. **Unit Tests**: Pure functions (filters, sorting, utils)
2. **E2E Tests**: Critical user flows (filter, search, load more)
3. **Pre-commit Hooks**: Enforce quality before commits
4. **CI Pipeline**: Automated testing on push/PR

<!-- ## CI/CD

GitHub Actions workflow runs on push/PR:

1. Install dependencies
2. Type checking
3. Linting
4. Unit tests
5. Build

See `.github/workflows/ci.yml` for configuration. -->

<!-- ## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile) -->

<!-- ## Future Enhancements

- [ ]  -->

<!-- ## License

MIT -->

<!-- ## Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for product data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [TailwindCSS](https://tailwindcss.com/) for styling -->
