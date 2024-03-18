import { db } from "."
import { faker } from '@faker-js/faker';
import { roles, users, type InsertUser } from "./schema"
import { v4 as uuidv4 } from 'uuid';

(async () => {
    try {
        console.log('Start seeding');

        const usersData: InsertUser[] = []
        const roleId = uuidv4().toString()
        // create user role
        await db.insert(roles).values({
            id: roleId,
            role: "user"
        })

        for (let i = 0; i < 20; i++) {
            usersData.push({
                id: faker.string.uuid(),
                username: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                roleId: roleId
            })
        }
        await db.insert(users).values(usersData)
        console.log('Successfully seeded the database');
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
)()