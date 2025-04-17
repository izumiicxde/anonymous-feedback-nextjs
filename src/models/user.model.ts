import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: IMessage[];
}

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "user valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
        required: [true, "verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "code expiry date is required."],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});

//return mongoose model of type USER or create a new user model
const UserModel =
    (mongoose.models.User as mongoose.Model<IUser>) ||
    mongoose.model<IUser>("User", UserSchema);

export default UserModel;
