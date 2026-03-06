import { dbServices } from "../services/user.service.ts"

export const createHandler = async (payload) => {
    const user = await dbServices.user.craeteUserService(payload)
    return user
}








