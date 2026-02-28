import type {Request, Response} from 'express';
import { parseXml } from './parse.ts';
import { dispatch } from './dispatch.ts';

export const pipeline = async (req: Request,res:Response) => {
    const xml = req.body;
    const {operationType, payload} = await parseXml(xml)
    dispatch(operationType, payload)

    return res.json({message:"success"})
}