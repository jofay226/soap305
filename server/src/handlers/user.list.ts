import { listUsersService } from "../services/user.service.ts";

export const listHandler = async () => {
    console.log('list handler'); 
    await listUsersService();
}

