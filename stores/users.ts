import type { InsertUser } from "~/db/schema"

export const useUserStore = defineStore('userStore', {
    state: (): { users: InsertUser[] } => ({
        users: []
    }),
    actions: {
        async fetch() {
            const users = await $fetch('/api/users')
            this.users = users
        }
    }
})
