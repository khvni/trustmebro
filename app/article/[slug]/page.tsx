import { notFound } from 'next/navigation'
import Masthead from '@/components/Masthead'
import ArticleFull from '@/components/ArticleFull'
import type { Article } from '@/db/schema'
import type { Metadata } from 'next'

async function getArticle(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles/${slug}`,
    { cache: 'no-store' }
  )

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.article as Article
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getArticle(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.headline} - The Trustmebro Times`,
    description: article.subheadline,
    openGraph: {
      title: article.headline,
      description: article.subheadline,
      type: 'article',
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container">
      <Masthead />
      <main className="main-content article-page">
        <ArticleFull article={article} />
      </main>
      <footer className="footer">
        <p>© 2024 The Trustmebro Times. All rights reserved (probably).</p>
      </footer>
    </div>
  )
}
