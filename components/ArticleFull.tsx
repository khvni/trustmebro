import type { Article } from '@/db/schema'

interface ArticleFullProps {
  article: Article
}

export default function ArticleFull({ article }: ArticleFullProps) {
  // Split body into paragraphs
  const paragraphs = article.body.split('\n\n').filter((p) => p.trim())

  return (
    <article className="article-full">
      <header className="article-header">
        <h1 className="article-headline">{article.headline}</h1>
        <h2 className="article-subheadline">{article.subheadline}</h2>
        <p className="article-dateline">{article.dateline}</p>
      </header>

      <div className="article-body">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index === 0 ? 'first-paragraph' : ''}>
            {paragraph}
          </p>
        ))}

        {article.quotes && article.quotes.length > 0 && (
          <div className="article-quotes">
            {article.quotes.map((quote, index) => (
              <blockquote key={index} className="article-quote">
                "{quote}"
              </blockquote>
            ))}
          </div>
        )}

        {article.caption && (
          <p className="article-caption">{article.caption}</p>
        )}
      </div>
    </article>
  )
}
