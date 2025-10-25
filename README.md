# The Trustmebro Times

A parody newspaper generator that transforms mundane daily events into dramatic, over-the-top news articles using AI.

## Features

- 🎨 Authentic newspaper design with vintage typography
- 🤖 AI-powered article generation (Anthropic Claude)
- 📰 Multi-column CSS Grid layout
- 🔒 Rate limiting (60s per IP)
- 🛡️ Profanity filtering
- 📱 Responsive design (mobile, tablet, desktop)
- ⚡ Next.js 14 with App Router
- 💾 Neon Postgres database

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key
- Neon account (for database)

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
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `DATABASE_URL` - Your Neon database connection string

### Database Setup

1. Create a Neon database:
   - Go to [https://neon.tech](https://neon.tech)
   - Sign up and create a new project
   - Copy the connection string

2. Push the schema to your database:
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

- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `DATABASE_URL` - Your Neon database connection string

## Usage

1. **Generate an article**: Go to the homepage and describe your mundane day
2. **View all articles**: Navigate to `/articles` to see recent stories
3. **Share**: Each article has a unique URL for sharing

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: CSS with CSS Grid, Google Fonts
- **Database**: Neon (Postgres), Drizzle ORM
- **AI**: Anthropic Claude
- **Deployment**: Vercel

## License

MIT

## Credits

Built with [Claude Code](https://claude.com/claude-code)
