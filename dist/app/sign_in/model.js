import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import mongodb from '../../utils/mongodb.js';
const schema_user = new mongoose.Schema({
    email: String,
    password: String,
    age: Number,
    createdAt: Date,
    updatedAt: Date,
    isActive: Boolean,
    isVerified: Boolean,
    votersID: String
});
schema_user.pre("save", async function () {
    if (this.isNew) {
        const model_user = this.model("users");
        const isPresent = await model_user.findOne({ email: this.email }) && true;
        if (isPresent) {
            throw new Error("user with email already exists.");
        }
        else {
            this.isActive = true;
            this.createdAt = new Date(Date.now());
            this.isVerified = false;
            this.votersID = "unknown";
        }
    }
});
schema_user.pre("save", async function () {
    if (this.isModified('password')) {
        try {
            const rounds = Number(process.env.PASS_ENCRYPT_ROUND);
            const salt = await bcrypt.genSalt(Number(rounds));
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }
        catch (err) {
            throw new Error(String(err));
        }
        ;
    }
});
schema_user.pre("save", function () {
    if (this.isModified()) {
        this.updatedAt = new Date(Date.now());
    }
});
const model_user_server = await mongodb.getDbServer(`${process.env.MONGO_DB_URI_USERS}`);
const model_user_db = await mongodb.getDb(model_user_server, `${process.env.MONGO_DB_USERS}`);
const model_user = model_user_db.model(`${process.env.MONGO_DB_MODEL_USERS}`, schema_user);
export default model_user;
