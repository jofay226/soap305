import { listUsersService } from "../services/user.service.ts";
import { buildSoapResponse } from "../soap/build.ts";

export const listHandler = async () => { 
   const users =  await listUsersService();
   const xml = buildSoapResponse("listUsersResponse", users)
    return xml
}

