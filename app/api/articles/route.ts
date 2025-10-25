import { NextResponse } from 'next/server'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allArticles = await db
      .select()
      .from(articles)
      .orderBy(desc(articles.createdAt))
      .limit(20)

    return NextResponse.json({ articles: allArticles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
