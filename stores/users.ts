import { type BanUser, type InsertUser, type UpdateUser } from "~/db/schema"

export const useUserStore = defineStore('userStore', {
    state: (): { users: InsertUser[], user?: InsertUser } => ({
        users: [],
    }),
    actions: {
        async fetch() {
            const { data: users } = await useFetch('/api/users')
            this.users = users.value!
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
        async bulkDelete(usersArray: Array<string>) {
            try {
                const data = await $fetch(`/api/users/`, {
                    method: "delete",
                    body: JSON.stringify(usersArray)
                })
                if (data) {
                    if (data.success) {
                        await this.fetch()
                        return true
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        async update(id: string, user: UpdateUser | BanUser) {
            try {
                const data = await $fetch(`/api/users/${id}`, {
                    method: "put",
                    body: JSON.stringify(user)
                })
                if (data) {
                    if (data.success) {
                        await this.fetch()
                        await this.fetchUser(id)
                        return data
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        async bulkUpdate(usersArray: Array<{ id: string; isBanned: boolean }>) {
            try {
                const data = await $fetch(`/api/users/`, {
                    method: "put",
                    body: JSON.stringify(usersArray)
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
