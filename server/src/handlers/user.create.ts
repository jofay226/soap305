import { dbServices } from "../services/user.service.ts"
import { buildSoapResponse } from "../soap/build.ts"

export const createHandler = async (payload) => {
    const user = await dbServices.user.craeteUserService(payload)
    const newUserXml = buildSoapResponse("createUserResponse", [user])
    return newUserXml
}








