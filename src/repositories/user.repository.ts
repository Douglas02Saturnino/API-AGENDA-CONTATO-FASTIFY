import { prisma } from "../database/prisma-client";
import { User, UserRepository, UserCreate } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email
            }
        })
        return result;
    }
}

export { UserRepositoryPrisma};