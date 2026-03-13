import type {Request, Response} from 'express';
import { parseXml } from './parse.ts';
import { dispatch } from './dispatch.ts';

export const pipeline = async (req: Request,res:Response) => {
    const xml = req.body;
    const {operationType, payload} = await parseXml(xml)
    
    const xmlRes = await  dispatch(operationType, payload) 
    res.set("Content-Type", "text/xml")   
    return res.send(xmlRes)
}