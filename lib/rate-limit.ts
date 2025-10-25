// Simple in-memory rate limiter
// For production, consider using Redis or a more robust solution

const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 60 seconds

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const lastRequest = rateLimitMap.get(ip)

  if (lastRequest) {
    const timeSinceLastRequest = now - lastRequest
    if (timeSinceLastRequest < RATE_LIMIT_WINDOW_MS) {
      const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - timeSinceLastRequest) / 1000)
      return { allowed: false, retryAfter }
    }
  }

  rateLimitMap.set(ip, now)

  // Clean up old entries (optional, prevents memory leak)
  if (rateLimitMap.size > 10000) {
    const entries = Array.from(rateLimitMap.entries())
    const validEntries = entries.filter(([, timestamp]) => now - timestamp < RATE_LIMIT_WINDOW_MS)
    rateLimitMap.clear()
    validEntries.forEach(([key, value]) => rateLimitMap.set(key, value))
  }

  return { allowed: true }
}

export function getClientIp(request: Request): string {
  // Try multiple headers for IP address
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback (won't work in serverless but good for dev)
  return 'unknown'
}
