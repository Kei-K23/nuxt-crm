import { db } from "~/db"
import { roles } from "~/db/schema"

export default defineEventHandler(async (event) => {
    return await db.select().from(roles)
})