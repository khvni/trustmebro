import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity'

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
})

export function containsProfanity(text: string): boolean {
  return matcher.hasMatch(text)
}

export function checkContent(text: string): { allowed: boolean; reason?: string } {
  if (containsProfanity(text)) {
    return { allowed: false, reason: 'Content contains inappropriate language' }
  }

  return { allowed: true }
}
