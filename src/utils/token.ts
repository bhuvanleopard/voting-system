import jwt, {type JwtPayload, type SignOptions, type Secret} from 'jsonwebtoken';
import _dotenv from 'dotenv';

const generate = (payload: JwtPayload, secret_key: Secret, opts: SignOptions):string=>{

    const {sub, jti} = payload;
    const {expiresIn} = opts;
    return jwt.sign({sub, jti}, secret_key, {expiresIn});

};

const verify = (req_token: string, secret_key: Secret):null | JwtPayload=>{

    try{

        const decode = jwt.verify(req_token, secret_key) as JwtPayload;
        return decode

    }catch(err){

        console.log(err);
        return null
    };
};

const passwordResetToken = (email: string)=>{

    return generate({sub: email}, `${process.env.ACCESS_TOKEN_KEY}`, {expiresIn: "7m"})
} 

const token = { generate, verify, passwordResetToken}
export default token;

