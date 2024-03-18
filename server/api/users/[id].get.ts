import { eq } from "drizzle-orm"
import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const user = await db.select().from(users).where(eq(users.id, id!))
    setResponseStatus(event, 200)
    setHeader(event, 'Content-Type', 'application/json')
    return {
        success: true,
        user
    }
})
