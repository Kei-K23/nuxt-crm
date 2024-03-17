import { desc } from "drizzle-orm"
import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    return await db.select().from(users).orderBy(desc(users.createdAt))
})
