import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  headline: text('headline').notNull(),
  subheadline: text('subheadline').notNull(),
  dateline: text('dateline').notNull(),
  body: text('body').notNull(),
  quotes: text('quotes', { mode: 'json' }).$type<string[]>().notNull().default(sql`'[]'`),
  caption: text('caption').default(''),
  promptRaw: text('prompt_raw').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
