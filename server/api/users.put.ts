import { eq } from "drizzle-orm"
import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    for (const u in data) {
        await db.update(users).set({ isBanned: !data[u].isBanned }).where(eq(users.id, data[u].id))
    }

    setResponseStatus(event, 200)
    return {
        success: true,
    }
})