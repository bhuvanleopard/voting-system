import { type Document } from "mongoose";

interface User extends Document {

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
