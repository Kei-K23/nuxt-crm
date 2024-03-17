import { type InsertUser } from "~/db/schema"

export const useUserStore = defineStore('userStore', {
    state: (): { users: InsertUser[] } => ({
        users: []
    }),
    actions: {
        async fetch() {
            const users = await $fetch('/api/users')
            this.users = users
        },
        async delete(id: string) {
            try {
                await $fetch(`/api/users/${id}`, {
                    method: "delete"
                })
                await this.fetch()
            } catch (error) {
                console.error(error);
            }
        }
    }
})
