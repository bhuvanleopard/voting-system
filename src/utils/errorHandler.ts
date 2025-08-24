import { type Request, type Response, type NextFunction } from "express";


const errorHandler = function(
    
err: any, 
_req: Request, 
res: Response, 
next: NextFunction){

    if(err){

        console.log(err)
    }

    res.status(401).json({msg: "request failed"})
};

export default errorHandler;