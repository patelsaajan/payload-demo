# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Payload CMS Website Template** - a full-stack Next.js application that combines a headless CMS (Payload) with a production-ready frontend. Both the admin panel and the public-facing website run in a single Next.js instance, deployed together.

**Tech Stack:**
- Next.js 15 (App Router)
- Payload CMS 3.x (headless CMS with admin panel)
- PostgreSQL database (via `@payloadcms/db-postgres`)
- TypeScript
- TailwindCSS + shadcn/ui components
- Lexical rich text editor
- React 19

**Development Server:** Runs on port 4000 (not the default 3000)

## Commands

### Development
```bash
pnpm dev                    # Start dev server on port 4000
pnpm build                  # Build for production
pnpm start                  # Start production server
```

### Database & Type Generation
```bash
pnpm payload migrate:create # Create a new database migration (Postgres only)
pnpm payload migrate        # Run pending migrations
pnpm generate:types         # Generate TypeScript types from Payload config
```

### Testing
```bash
pnpm test                   # Run all tests (integration + e2e)
pnpm test:int               # Run integration tests (Vitest)
pnpm test:e2e               # Run e2e tests (Playwright)
```

### Linting & Code Quality
```bash
pnpm lint                   # Run ESLint
pnpm lint:fix               # Auto-fix ESLint issues
```

## Architecture

### Application Structure

The project uses Next.js App Router with **route groups** to separate concerns:

```
src/app/
├── (frontend)/          # Public-facing website
│   ├── [slug]/         # Dynamic page routes (e.g., /about, /services)
│   ├── posts/          # Blog listing and individual posts
│   ├── search/         # Search functionality
│   └── layout.tsx      # Frontend layout with Header/Footer
└── (payload)/          # Payload CMS admin panel
    ├── admin/          # Admin UI routes
    └── api/            # API routes for Payload
```

### Payload CMS Configuration

**Configuration:** `src/payload.config.ts` - Central configuration for Payload CMS

**Collections** (in `src/collections/`):
- `Pages` - Layout builder-enabled pages with draft/preview support
- `Posts` - Blog posts with draft/preview, categories, and authors
- `Media` - Uploads collection for images/videos with focal point support
- `Categories` - Nested taxonomy for organizing posts
- `Users` - Auth-enabled admin users

**Globals** (Header/Footer):
- `Header` (`src/Header/config.ts`) - Navigation links and site header data
- `Footer` (`src/Footer/config.ts`) - Footer content and links

### Content Building System

**Layout Builder:** Pages and Posts use a flexible block-based layout system. Blocks are defined in `src/blocks/`:
- `ArchiveBlock` - Display collections of posts/content
- `CallToAction` - CTA sections
- `Content` - Rich text content blocks (Lexical)
- `MediaBlock` - Image/video display
- `Form` - Form builder integration
- `Code` - Code snippets with syntax highlighting
- `Banner` - Banner messages
- `RelatedPosts` - Automatic related content

Each block has:
- `config.ts` - Payload field configuration
- `Component.tsx` - Frontend React component

**Hero System:** Pages/Posts can have different hero styles (in `src/heros/`):
- `HighImpact` - Full-screen hero with large media
- `MediumImpact` - Standard hero with image/content
- `LowImpact` - Minimal hero
- `PostHero` - Specialized for blog posts with metadata

### Key Features Implementation

**Draft Preview & Live Preview:**
- Uses Payload's versions system with `drafts: true`
- Preview URLs auto-generated via `generatePreviewPath` utility
- Live preview configured in admin with responsive breakpoints

**On-Demand Revalidation:**
- Hooks in collections trigger Next.js revalidation when content is published
- Located in `src/collections/*/hooks/` (e.g., `Pages/hooks/revalidatePage.ts`)

**Search:**
- Powered by `@payloadcms/plugin-search`
- Configuration in `src/plugins/index.ts`
- Field overrides in `src/search/fieldOverrides.ts`
- Sync logic in `src/search/beforeSync.ts`

**SEO:**
- Uses `@payloadcms/plugin-seo`
- Meta generation utilities in `src/utilities/generateMeta.ts`
- OpenGraph helpers in `src/utilities/mergeOpenGraph.ts`

**Redirects:**
- Managed via `@payloadcms/plugin-redirects`
- Admin-editable redirects collection
- Revalidation hook: `src/hooks/revalidateRedirects.ts`

**Jobs & Scheduled Publishing:**
- Configured in `payload.config.ts` under `jobs`
- Protected by auth or CRON_SECRET for headless execution
- Used for scheduled publish/unpublish of content

### Database (PostgreSQL)

**Important:** This project uses PostgreSQL with Drizzle ORM. Schema changes require migrations:

1. **Development:** By default, `push: true` allows schema changes without migrations
2. **Production:** Always create and run migrations:
   ```bash
   pnpm payload migrate:create  # After changing collections/fields
   pnpm payload migrate         # Run on server before starting
   ```

**Type Generation:** After changing Payload collections or fields, run `pnpm generate:types` to update `src/payload-types.ts`.

### Utilities & Helpers

Key utilities in `src/utilities/`:
- `getURL.ts` - Generate server-side URLs (important: uses environment variables)
- `getDocument.ts` - Fetch single documents by slug
- `getMeUser.ts` - Get current authenticated user
- `generatePreviewPath.ts` - Generate preview URLs for drafts
- `formatDateTime.ts` / `formatAuthors.ts` - Display formatting

### Access Control

Access control logic in `src/access/`:
- `authenticated` - Require logged-in user
- `authenticatedOrPublished` - Public can read published, users can read all
- Applied to collections/fields in their respective config files

### Testing

**Integration Tests** (`tests/int/`):
- Use Vitest with jsdom
- Test utilities and helper functions
- Run with `pnpm test:int`

**E2E Tests** (`tests/e2e/`):
- Use Playwright
- Test full user flows
- Automatically start dev server on port 4000
- Run with `pnpm test:e2e`

### Plugins & Extensions

All plugins configured in `src/plugins/index.ts`:
- Form Builder (no payment fields)
- Nested Docs (for categories)
- SEO (with custom title/URL generators)
- Search (posts only)
- Redirects (pages & posts)
- Payload Cloud (for cloud deployments)

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - JWT encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public URL (no trailing slash)
- `CRON_SECRET` - Authenticate scheduled jobs
- `PREVIEW_SECRET` - Validate draft preview requests

## Important Patterns

### Working with Payload Types
- Always import types from `@/payload-types` (auto-generated)
- Run `pnpm generate:types` after config changes
- Types include: `Page`, `Post`, `Media`, `User`, `Category`, `Config`

### Frontend Data Fetching
- Pages are statically generated by default
- Use Next.js `revalidate` or `revalidatePath` for updates
- Draft content fetched server-side with auth tokens
- No caching by default (can re-enable for non-Payload Cloud deploys)

### Adding a New Block
1. Create directory in `src/blocks/NewBlock/`
2. Add `config.ts` with Payload field configuration
3. Add `Component.tsx` for frontend rendering
4. Export from block directory's `index.ts`
5. Register in layout builder field (see `Pages/index.ts`)
6. Add to `RenderBlocks.tsx` component

### Adding a New Collection
1. Create in `src/collections/NewCollection/`
2. Define fields, hooks, and access control
3. Add to `payload.config.ts` collections array
4. Run `pnpm generate:types`
5. Create migration if using Postgres: `pnpm payload migrate:create`

### Working with Migrations (Postgres)
- Always test migrations locally before deploying
- Never set `push: true` when pointing to production
- Migrations are run automatically on Payload Cloud
- Losing data is possible with schema changes - migrate carefully

## Common Issues

**Port Conflicts:** Dev server uses port 4000, not 3000. Check `package.json` scripts.

**Type Errors After Schema Changes:** Run `pnpm generate:types` to regenerate `payload-types.ts`.

**Database Schema Drift:** If using Postgres and schema doesn't match, create and run a migration.

**Image Revalidation:** Changing an image requires republishing the page/post to clear Next.js image cache.

**Caching Behavior:** Next.js caching is disabled by default (for Payload Cloud). Remove `export const dynamic = 'force-dynamic'` from pages to re-enable.
