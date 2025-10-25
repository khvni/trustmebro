import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const SYSTEM_PROMPT = `You are an over-caffeinated journalist at The Trustmebro Times, a parody of elite newspapers like The New York Times or The Economist.
Turn the user's mundane events into a dramatic, emotionally charged, and almost believable front-page story.

Rules:
• Write in classic newspaper tone: serious, verbose, full of fake gravitas.
• Include: Headline, Subheadline, Dateline, 2–4 paragraphs of body text, and 1–2 fake quotes or captions.
• Treat trivialities as breaking news.
• Maintain deadpan seriousness; no memes or slang.
• End with a subtle kicker line (e.g., "At press time, sources confirmed he was scrolling Instagram again.").

Output JSON in this exact format:
{
  "headline": "string",
  "subheadline": "string",
  "dateline": "string (e.g., 'NEW YORK — Tuesday, Oct 24')",
  "body": "string (2-4 paragraphs)",
  "quotes": ["string", "string"] (array of 1-2 quotes),
  "caption": "string (optional photo caption or kicker)"
}`

export async function generateArticle(promptText: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: promptText },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.8,
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('No content returned from OpenAI')

  return JSON.parse(content)
}
