import {Request, Response, NextFunction} from 'express';
import boom, {Boom} from '@hapi/boom';

export const boomHandle ={
    viewError(err:Boom, req:Request, res:Response, next:NextFunction){
        if(err.isBoom){
            const {payload} = err.output;
            res.status(payload.statusCode).json(payload);
        }else{
            next(err);
        }
    },
    finalError(err:Error, req:Request, res:Response, next:NextFunction){
        const fin = boom.badImplementation(err.message);
        res.status(500).json(fin.output.payload);
    }
} 


