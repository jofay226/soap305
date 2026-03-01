import prisma from "../db/prisma.ts";


export const createUserService = async (payload) => {
    console.log(payload);

    prisma.user.create({
        data: {
            email:  ,
            name: ,
            age: 
        }
    })
    
}