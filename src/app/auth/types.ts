import { type Document, type Types } from "mongoose";

interface User extends Document {

    _id: Types.ObjectId,
    email: string;
    password: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isVerified: boolean;
    votersID: string;
};

export type{User};
