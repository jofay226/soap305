import { createHandler } from "../handlers/user.create.ts"
import { deleteHandler } from "../handlers/user.delete.ts"
import { listHandler } from "../handlers/user.list.ts"
import { updateHandler } from "../handlers/user.update.ts"

const handlers = {
    "createUserRequest": createHandler,
    "listUsersRequest": listHandler,
    "updateUserRequest": updateHandler,
    "deleteUserRequest": deleteHandler
}

export const dispatch = (operationType: any, payload: any) => {
    handlers[operationType](payload)
  
    // switch(operationType){
    //     case "createUserRequest":
    //         return createHandler(payload)
    //     case "listUsersRequest":
    //         return  listHandler()   
    //     case "updateUserRequest":
    //         return  updateHandler(payload)   
    //     case "deleteUserRequest":
    //         return  deleteHandler(payload)      
    // }
}