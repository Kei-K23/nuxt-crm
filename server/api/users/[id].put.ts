import { eq } from "drizzle-orm"
import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const user = await readBody(event)

    const updatedUser = await db.update(users).set(user).where(eq(users.id, id!)).returning()
    setResponseStatus(event, 200)
    setHeader(event, 'Content-Type', 'application/json')
    return {
        success: true,
        user: updatedUser
    }
})
