import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export const SYSTEM_PROMPT = `You are an over-caffeinated journalist at The Trustmebro Times, a parody of elite newspapers like The New York Times or The Economist.
Turn the user's mundane events into a dramatic, emotionally charged, and almost believable front-page story.

Rules:
• Write in classic newspaper tone: serious, verbose, full of fake gravitas.
• Include: Headline, Subheadline, Dateline, 2–4 paragraphs of body text, and 1–2 fake quotes or captions.
• Treat trivialities as breaking news.
• Maintain deadpan seriousness; no memes or slang.
• End with a subtle kicker line (e.g., "At press time, sources confirmed he was scrolling Instagram again.").

You MUST respond with valid JSON only in this exact format:
{
  "headline": "string",
  "subheadline": "string",
  "dateline": "string (e.g., 'NEW YORK — Tuesday, Oct 24')",
  "body": "string (2-4 paragraphs)",
  "quotes": ["string", "string"],
  "caption": "string (optional photo caption or kicker)"
}`

export async function generateArticle(promptText: string) {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    temperature: 0.8,
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: promptText },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type from Claude')

  // Extract JSON from the response (Claude may wrap it in markdown)
  let jsonText = content.text.trim()

  // Remove markdown code blocks if present
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '')
  }

  return JSON.parse(jsonText)
}
