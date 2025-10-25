import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { generateArticle } from '@/lib/openai'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { checkContent } from '@/lib/profanity'
import { generateSlug, validateArticleData } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIp)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${rateLimitResult.retryAfter} seconds.` },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { text } = body

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    if (text.length < 10) {
      return NextResponse.json({ error: 'Text must be at least 10 characters' }, { status: 400 })
    }

    if (text.length > 1000) {
      return NextResponse.json({ error: 'Text must be less than 1000 characters' }, { status: 400 })
    }

    // Check for profanity
    const contentCheck = checkContent(text)
    if (!contentCheck.allowed) {
      return NextResponse.json({ error: contentCheck.reason }, { status: 400 })
    }

    // Generate article using OpenAI
    const articleData = await generateArticle(text)

    // Validate the generated article
    if (!validateArticleData(articleData)) {
      throw new Error('Invalid article data returned from AI')
    }

    // Generate slug
    const slug = generateSlug(articleData.headline)

    // Save to database
    const newArticle = {
      id: nanoid(),
      slug,
      headline: articleData.headline,
      subheadline: articleData.subheadline,
      dateline: articleData.dateline,
      body: articleData.body,
      quotes: articleData.quotes || [],
      caption: articleData.caption || '',
      promptRaw: text,
    }

    await db.insert(articles).values(newArticle)

    return NextResponse.json({ success: true, slug }, { status: 201 })
  } catch (error: any) {
    console.error('Error generating article:', error)
    return NextResponse.json(
      { error: 'Failed to generate article. Please try again.' },
      { status: 500 }
    )
  }
}
