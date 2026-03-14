# Dakota's Portfolio

A personal portfolio website built with Vue 3, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend:** Vue 3 (Composition API), TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **State:** Pinia, VueUse
- **Backend:** Supabase (ready for integration)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dakotas-site.git
cd dakotas-site

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:5173`

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Lint and fix code |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Run TypeScript type checking |

## Project Structure

```
src/
├── assets/        # Static assets and global CSS
├── components/    # Reusable Vue components
├── composables/   # Vue composables (useAuth, etc.)
├── layouts/       # Page layouts
├── lib/           # Utilities and service clients
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── types/         # TypeScript type definitions
└── views/         # Page components
```

## Deployment

This project is configured for Vercel. Connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables on Vercel

Add the following environment variables in your Vercel project settings:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## License

MIT
