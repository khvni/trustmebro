import Masthead from '@/components/Masthead'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/db/schema'

async function getArticles() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles`, {
    cache: 'no-store', // Or use revalidate for ISR
  })

  if (!response.ok) {
    throw new Error('Failed to fetch articles')
  }

  const data = await response.json()
  return data.articles as Article[]
}

export const revalidate = 60 // Revalidate every 60 seconds (ISR)

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container">
      <Masthead />
      <main className="main-content">
        <h2 className="page-title">Recent Stories</h2>

        {articles.length === 0 ? (
          <p className="no-articles">
            No stories published yet. Be the first to create one!
          </p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
      <footer className="footer">
        <p>© 2024 The Trustmebro Times. All rights reserved (probably).</p>
      </footer>
    </div>
  )
}
