import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const user = await readBody(event)
    const createdUser = await db.insert(users).values(user).returning()
    setResponseHeader(event, "Content-Type", "application/json")
    setResponseStatus(event, 201)
    return {
        success: true,
        user: createdUser,
    }
})
