import { sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const roles = sqliteTable('roles', {
    id: text('id').primaryKey(),
    role: text('role').unique(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
})

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    email: text('email').unique().notNull(),
    phone: text('phone'),
    address: text('address'),
    roleId: text('role_id').references(() => roles.id),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
})

export type InsertUser = typeof users.$inferInsert;

export type InsertRole = typeof roles.$inferInsert;