# Non-Optimized Areas

The following items are identified for future technical optimization but were not modified in the current production-readiness pass to avoid introducing regressions in the final delivery:

1. **Bundle Size**: Vite reported chunks larger than 500kB. This is primarily due to the heavy use of premium animation libraries like `framer-motion` and `gsap`.
   - *Recommendation*: Implement dynamic `import()` for the `Blogs` and `Services` pages to code-split the application.

2. **Image Optimization**: Images are served as PNG/SVG.
   - *Recommendation*: For further speed, convert PNGs to WebP format for faster loading in browsers.

3. **Analytics**: No tracking or analytics (e.g., Google Analytics) integrated yet.
   - *Recommendation*: Add a tracking ID once the production domain is live.

4. **Security Headers**: CSP is implemented in `index.html`, but server-side headers (HSTS, etc.) should be configured at the hosting level (e.g., Vercel/Netlify/Nginx configuration).
