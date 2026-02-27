import type {Request, Response} from 'express';

export const pipeline = (req: Request,res:Response) => {
    const xml = req.body;

    

    
    

    return res.json({message:"success"})
}