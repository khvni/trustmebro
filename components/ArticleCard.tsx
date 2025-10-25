import Link from 'next/link'
import type { Article } from '@/db/schema'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <Link href={`/article/${article.slug}`} className="article-card">
      <article>
        <h3 className="article-card-headline">{article.headline}</h3>
        <p className="article-card-subheadline">{article.subheadline}</p>
        <time className="article-card-date">{formattedDate}</time>
      </article>
    </Link>
  )
}
