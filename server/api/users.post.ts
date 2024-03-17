import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const user = await readBody(event)
    await db.insert(users).values(user)
    setResponseHeader(event, "Content-Type", "application/json")
    setResponseStatus(event, 201)
    return user
})
