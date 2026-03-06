import { dbServices } from "../services/user.service.ts";
import { buildSoapResponse } from "../soap/build.ts";

export const updateHandler = async (payload) => {
    const updatedUser = await  dbServices.user.updateUserService(payload)
    const updateUserXml = buildSoapResponse("updateUserRequest", [payload])
    return updateUserXml
    
}
