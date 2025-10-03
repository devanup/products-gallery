# Quick Start Guide

Get the products gallery running in under 2 minutes.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

## Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/products](http://localhost:3000/products) in your browser.

## What You'll See

- **Products Page**: Grid of products from FakeStore API
- **Filter Sidebar**: Desktop view shows filters on the left
- **Mobile Drawer**: Mobile view shows filters in a slide-in drawer
- **Search Bar**: Type to search products (debounced)
- **Sort Dropdown**: Sort by price or rating
- **Load More**: Click to load additional products

## Try These Features

1. **Search**: Type "shirt" in the search box
2. **Filter by Category**: Click "electronics" or "clothing"
3. **Adjust Price**: Move the price range slider
4. **Sort**: Change sort order to "Price: Low to High"
5. **Load More**: Click to see more products
6. **Clear Filters**: Click "Clear all" to reset

## URL Sharing

All filters are in the URL - you can bookmark or share links:

```
http://localhost:3000/products?search=bag&category=men%27s%20clothing&min=20&max=80&rating=3&sort=price-asc
```

## Mobile Testing

1. Open Chrome DevTools (F12)
2. Click the device toggle icon (mobile view)
3. Click "Show Filters" button
4. Drawer slides in from the left

## Running Tests

```bash
# Unit tests
npm run test:run

# E2E tests (requires dev server running)
npm run test:e2e
```

## Building for Production

```bash
npm run build
npm run start
```

## Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run lint         # Check code quality
npm run typecheck    # Check TypeScript
npm run format       # Format code with Prettier
```

## Troubleshooting

### Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Installation fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails

```bash
# Check for TypeScript errors
npm run typecheck

# Check for linting issues
npm run lint
```

## Project Structure Overview

```
/app/products          # Products page
/components/products   # Product-specific components
/hooks                 # Custom React hooks
/lib                   # Utilities and API calls
/tests                 # Unit and E2E tests
```

## Key Files

- `app/products/page.tsx` - Main products page
- `lib/api.ts` - API integration
- `lib/filters.ts` - Filter logic
- `hooks/useFilterState.ts` - URL-synced state

## Next Steps

1. Read [README.md](README.md) for detailed documentation
2. Review [FEATURES.md](FEATURES.md) for complete feature list
3. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
4. Explore the codebase and customize as needed

## Need Help?

- Check the [README.md](README.md) for detailed info
- Review test files in `/tests` for usage examples
- Look at component implementations in `/components/products`

## API Information

This app uses the free [FakeStore API](https://fakestoreapi.com/):

- No API key required
- ~20 products across 4 categories
- Rate limit: Reasonable for development

## Performance Tips

- The app fetches all products once and filters client-side
- React Query caches data for 5 minutes
- Images are lazy-loaded
- Build size is optimized (~150KB for products page)

Enjoy building with this products gallery!
