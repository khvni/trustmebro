import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const articles = pgTable('articles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  headline: text('headline').notNull(),
  subheadline: text('subheadline').notNull(),
  dateline: text('dateline').notNull(),
  body: text('body').notNull(),
  quotes: jsonb('quotes').$type<string[]>().notNull().default([]),
  caption: text('caption').default(''),
  promptRaw: text('prompt_raw').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
