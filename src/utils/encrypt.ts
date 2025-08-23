import bcrypt from 'bcryptjs';
import validate from './validate.js';

const hashPassword = async(password: string):Promise<string>=>{

    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const verifyPassword = async(rawPassword: string, hashedPassword: string):Promise<boolean>=>{

    return (await bcrypt.compare(rawPassword, hashedPassword) && true )|| false;
};

const updatedPassword = async(currentPasswordHash: string, newPassword:string):Promise<string | null>=>{

    const isSame:boolean = await bcrypt.compare(newPassword, currentPasswordHash);
    if(isSame){

        return null;

    }else{

        return await hashPassword(newPassword);
    };
};


const encrypt = {hashPassword, verifyPassword, updatedPassword};
export default encrypt