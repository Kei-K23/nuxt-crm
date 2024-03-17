import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    return await db.select().from(users)
})
