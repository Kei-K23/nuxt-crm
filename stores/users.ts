import { type InsertUser, type UpdateUser } from "~/db/schema"

export const useUserStore = defineStore('userStore', {
    state: (): { users: InsertUser[], user?: InsertUser } => ({
        users: [],
    }),
    actions: {
        async fetch() {
            const users = await $fetch('/api/users')
            this.users = users
        },
        async fetchUser(id: string) {
            const data = await $fetch(`/api/users/${id}`, {
                method: 'get'
            })
            this.user = data.user[0]
        },
        async delete(id: string) {
            try {
                const data = await $fetch(`/api/users/${id}`, {
                    method: "delete"
                })
                if (data) {
                    if (data.success) {
                        await this.fetch()
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        async update(id: string, user: UpdateUser) {
            try {
                const data = await $fetch(`/api/users/${id}`, {
                    method: "put",
                    body: JSON.stringify(user)
                })
                if (data) {
                    if (data.success) {
                        await this.fetch()
                        return data
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
})
