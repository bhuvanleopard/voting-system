import model_user from "./model.js";
import type { User } from "./types.js";
import encrypt from "../../utils/encrypt.js";
import mailer from "../../utils/mailer.js";
import token from "../../utils/token.js";
import bcrypt from "bcryptjs";

const CachedUsers = new Map<string, User>();

const isPresent =  async function(email: string):Promise<boolean>{

    const fetchedUser = await model_user.findOne({email: email});
    const userExist = (fetchedUser && true) || false;
    if(userExist){

        if(!CachedUsers.has(fetchedUser!.email)){

            CachedUsers.set(fetchedUser!.email, fetchedUser!)
        };
    };

    return userExist;
};

const signIn = async function(email: string, password: string, age: number): Promise<boolean>{

    const new_user = new model_user()
    new_user.email = email;
    new_user.password = password;
    new_user.age = age;
    new_user.isActive = true;
    new_user.isVerified = false;
    new_user.votersID = "unknown";
    new_user.createdAt = new Date(Date.now());
    await new_user.save();
    return true;
};


const logIn = async function(email: string, password: string):Promise<boolean>{

    return await encrypt.verifyPassword(password, CachedUsers.get(email)!.password)
    
};

const resetPassword = async function(email: string){

    return await mailer.send(email, "password reset mail", `<a href=${process.env.PASS_RESET_ROUTE}/token=${token.passwordResetToken(email)}>`)
};


const changePassword = async(newPassword:string):Promise<string | null>=>{

    return await encrypt.hashPassword(newPassword)
};

const service = {isPresent, signIn, logIn, resetPassword, changePassword};
export default service;