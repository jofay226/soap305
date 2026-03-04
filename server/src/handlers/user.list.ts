import { dbServices } from "../services/user.service.ts";
import { buildSoapResponse } from "../soap/build.ts";

export const listHandler = async () => { 
   const users =  await dbServices.user.listUsersService()
   const xml = buildSoapResponse("listUsersResponse", users)
    return xml
}

