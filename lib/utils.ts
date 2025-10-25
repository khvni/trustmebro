import { nanoid } from 'nanoid'

export function generateSlug(headline: string): string {
  // Create a URL-friendly slug from the headline
  const baseSlug = headline
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .substring(0, 60) // Limit length

  // Add a unique identifier to prevent collisions
  const uniqueId = nanoid(8)

  return `${baseSlug}-${uniqueId}`
}

export function formatDate(): string {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return now.toLocaleDateString('en-US', options)
}

export function validateArticleData(data: any): boolean {
  return (
    data &&
    typeof data.headline === 'string' &&
    typeof data.subheadline === 'string' &&
    typeof data.dateline === 'string' &&
    typeof data.body === 'string' &&
    Array.isArray(data.quotes) &&
    data.headline.length > 0 &&
    data.body.length > 0
  )
}
