import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const roles = sqliteTable('roles', {
    id: text('id').primaryKey(),
    role: text('role').unique(),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
})

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone'),
    address: text('address'),
    isBanned: integer('isBanned', { mode: "boolean" }).default(false),
    roleId: text('role_id').references(() => roles.id),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
})

export type InsertUser = typeof users.$inferInsert;

export type UpdateUser = Omit<typeof users.$inferInsert, 'id' | 'updatedAt' | "createdAt">;

export type BanUser = {
    isBanned: boolean
};



export type InsertRole = typeof roles.$inferInsert;