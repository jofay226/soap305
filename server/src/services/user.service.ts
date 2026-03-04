import prisma from "../db/prisma.ts";
import { createUserType } from "../types/user.types.ts";


// export const createUserService = async (payload) => {
//     console.log(payload);

//     prisma.user.create({
//         data: {
//             email:  ,
//             name: ,
//             age: 
//         }
//     })
    
// }

// export const listUsersService = async () => {
//     const users = await prisma.user.findMany();
//     return users
// }

export const dbServices = {
    user: {
        listUsersService:  async () => {
            const users = await prisma.user.findMany();
            return users
        },
        craeteUserService: async (paylaod: createUserType) => {  
            
            const newUser = await prisma.user.create({
                data: {
                    name: paylaod.name[0],
                    age: +paylaod.age[0],
                    email:  paylaod.email[0]
                }
            })
            return newUser
        }
    },
}