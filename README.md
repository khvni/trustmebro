# The Trustmebro Times

A parody newspaper generator that transforms mundane daily events into dramatic, over-the-top news articles using AI.

## Features

- 🎨 Authentic newspaper design with vintage typography
- 🤖 AI-powered article generation (OpenAI GPT-4)
- 📰 Multi-column CSS Grid layout
- 🔒 Rate limiting (60s per IP)
- 🛡️ Profanity filtering
- 📱 Responsive design (mobile, tablet, desktop)
- ⚡ Next.js 14 with App Router
- 💾 SQLite database via Turso

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key
- Turso account (for database)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd trustmebro
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- `OPENAI_API_KEY` - Your OpenAI API key
- `TURSO_DATABASE_URL` - Your Turso database URL
- `TURSO_AUTH_TOKEN` - Your Turso auth token

### Database Setup

1. Create a Turso database:
```bash
turso db create trustmebro-times
```

2. Get your database URL and auth token:
```bash
turso db show trustmebro-times
turso db tokens create trustmebro-times
```

3. Push the schema to your database:
```bash
npm run db:push
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
trustmebro/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── article/[slug]/    # Individual article page
│   ├── articles/          # Articles feed
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage (input form)
│   └── globals.css        # Global styles
├── components/            # React components
├── db/                    # Database schema and connection
├── lib/                   # Utilities (OpenAI, rate limiting, etc.)
└── drizzle.config.ts      # Drizzle ORM configuration
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

- `OPENAI_API_KEY`
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `NEXT_PUBLIC_BASE_URL` (optional, your production URL)

## Usage

1. **Generate an article**: Go to the homepage and describe your mundane day
2. **View all articles**: Navigate to `/articles` to see recent stories
3. **Share**: Each article has a unique URL for sharing

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: CSS with CSS Grid, Google Fonts
- **Database**: Turso (SQLite), Drizzle ORM
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel

## License

MIT

## Credits

Built with [Claude Code](https://claude.com/claude-code)
