import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance){
    fastify.post<{Body: UserCreate}>('/', async (req, reply) =>{
        const {name , email} = req.body
        try{
            const data = await UserUseCase.create({
                name,
                email
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.get('/', (req, reply) => {
        reply.send({ hello: 'world' })
    })
}