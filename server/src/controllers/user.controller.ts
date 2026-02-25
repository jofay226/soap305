import type {Request, Response} from 'express';
import { errorResponseBuilder, successResponseBuilder } from '../soap/soap.utils.ts';
import { parseStringPromise} from 'xml2js';

const users = [
    {id: 1, name: "bob"},
    {id:2, name: "steve"},
]

export const userController = async (req: Request, res: Response) => {
    const data = await parseStringPromise(req.body, {explicitArray: false})
    const body = data['soap:Envelope']['soap:Body']

    console.log(data);
    
    console.log(body);

    if(body?.usersRequest === "getAllUsers"){
       return res.type("text/xml").send(successResponseBuilder(users))
    }
    
    
    res.type("text/xml").send(errorResponseBuilder())
}