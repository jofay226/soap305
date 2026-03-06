import { dbServices } from "../services/user.service.ts";
import { buildSoapResponse } from "../soap/build.ts";

export const deleteHandler = async (payload) => {
    const  deletedUser =  await dbServices.user.deleteUserService(payload)
    const deletedUserXml =  buildSoapResponse("deleteUserResponse", [deletedUser])
    return deletedUserXml
}
