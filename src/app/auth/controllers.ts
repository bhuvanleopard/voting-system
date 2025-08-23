import service from "./service.js";
import type { Request, Response, NextFunction } from "express";

const POST_SIGNIN = async function (

    req: Request,
    _res: Response,
    next: NextFunction

){
    try { const { email, password, age } = req.body;
    await service.signIn(email, password, age);
    next();

    }catch(err){
    next(err)};
};

const POST_LOGIN = async function(

    req: Request,
    _res: Response,
    next: NextFunction

){
    try{ const { email, password } = req.body;
    await service.logIn(email, password)
    next();

    }catch(err){
    next(err)};
};

const POST_RESET_PASS = async function(

    req: Request,
    _res: Response,
    next: NextFunction
){
    try{ const { email } = req.body;
    await service.resetPassword(email)
    next();

    }catch(err){
    next(err)};
};

const POST_CHANGE_PASS = async function(

    req: Request,
    _res: Response,
    next: NextFunction
){
    try{ const { password } = req.body;
    await service.changePassword(password)
    next();

    }catch(err){
    next(err)}
}

const controllers = {POST_SIGNIN, POST_LOGIN, POST_RESET_PASS, POST_CHANGE_PASS};
export default controllers;