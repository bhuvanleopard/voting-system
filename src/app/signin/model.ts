import {authDb} from '../../config/mongodb.js';
import { type User } from './types.js';
import mongoose, {type Document} from 'mongoose';
import _dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

const schema_user = new mongoose.Schema<User>({

    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    isActive: Boolean,
    isVerified: Boolean,
    votersID: String
});


schema_user.pre("save", async function (this: User & Document){

    if(this.isNew){

        const model_user = this.model("users");
        const isPresent = await model_user.findOne({email: this.email});
        if(isPresent){

            throw new Error("users with email already exists.")
        }
    }
});

schema_user.pre("save", async function(this: User & Document){

    if(this.isModified('password')){

        try{

            const rounds = Number(process.env.PASS_ENCRYPT_ROUND)
            const salt = await bcrypt.genSalt(Number(rounds));
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }catch(err){

            throw new Error(String(err));
        }
    }
})


export default (await authDb).model<User>("users", schema_user);