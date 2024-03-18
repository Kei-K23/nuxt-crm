import { eq } from "drizzle-orm"
import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const deletedUser = await db.delete(users).where(eq(users.id, id!)).returning()
    setResponseStatus(event, 200)
    return {
        success: true,
        user: deletedUser
    }
})
