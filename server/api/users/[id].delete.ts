
import { eq } from "drizzle-orm"
import { useRoute } from "nuxt/app"
import { db } from "~/db"
import { users } from "~/db/schema"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    await db.delete(users).where(eq(users.id, id!))
    setResponseStatus(event, 204)
})
