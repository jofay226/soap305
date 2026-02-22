import type {Request, Response} from 'express';
import { errorResponseBuilder, successResponseBuilder } from '../soap/soap.utils.ts';

export const userController = (req: Request, res: Response) => {


    res.type("text/xml").send(errorResponseBuilder())
}