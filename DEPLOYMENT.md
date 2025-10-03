# Deployment Guide

This Next.js application is optimized for deployment on Vercel, but can be deployed to any platform that supports Next.js.

## Vercel (Recommended)

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

That's it! Vercel automatically detects Next.js and configures everything.

### Manual Configuration

If you need custom settings:

**Build Command**: `npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install`
**Development Command**: `npm run dev`

### Environment Variables

No environment variables are required for this project since it uses a public API.

## Other Platforms

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add this to `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t products-gallery .
docker run -p 3000:3000 products-gallery
```

### Railway, Render, Fly.io

All support Next.js out of the box:

1. Connect your GitHub repository
2. Set build command to `npm run build`
3. Set start command to `npm run start`
4. Deploy

## Performance Optimization

### Before Deployment

1. Run Lighthouse audit: `npm install -g lighthouse && lighthouse http://localhost:3000/products`
2. Check bundle size: Build output shows chunk sizes
3. Verify images load correctly
4. Test on mobile viewport

### After Deployment

1. Enable Vercel Analytics (if using Vercel)
2. Set up monitoring (Sentry, LogRocket, etc.)
3. Configure CDN caching headers
4. Enable compression

## CI/CD

The included GitHub Actions workflow (`.github/workflows/ci.yml`) runs:

- Type checking
- Linting
- Unit tests
- Build

This ensures code quality before deployment.

### Auto-Deploy on Push

Most platforms support automatic deployment when you push to main:

- **Vercel**: Automatic (configure in project settings)
- **Netlify**: Automatic (configure in site settings)
- **Railway**: Automatic (configure in service settings)

## Monitoring

After deployment, monitor:

1. **Performance**: Core Web Vitals, load times
2. **Errors**: API failures, client errors
3. **Usage**: Popular products, filter usage
4. **Uptime**: API availability

## Rollback

If issues occur after deployment:

1. **Vercel**: Click "Rollback" in deployment history
2. **Netlify**: Select previous deploy and click "Publish"
3. **Git**: `git revert` and push

## Custom Domain

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed

### Other Platforms

Follow platform-specific instructions for custom domains. Generally:

1. Add domain in platform dashboard
2. Update DNS A/CNAME records
3. Enable SSL (usually automatic)

## Troubleshooting

### Build Fails

- Check Node.js version (18+ required)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run typecheck`

### Runtime Errors

- Check API connectivity to fakestoreapi.com
- Verify environment variables (none required for this project)
- Check browser console for errors

### Performance Issues

- Enable compression
- Optimize images further
- Consider ISR (Incremental Static Regeneration)
- Use CDN for static assets

## Production Checklist

- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] TypeScript checks pass
- [ ] No console errors
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] Accessibility tested
- [ ] Performance acceptable
- [ ] Error boundaries in place
- [ ] Analytics configured
- [ ] Custom domain set up (if applicable)
- [ ] SSL enabled

## Support

For deployment issues:

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
