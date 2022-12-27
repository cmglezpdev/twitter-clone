import mongoose, { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bibliography: { type: String, required: true },
    avatar: { type: String },
    banner: {  type: String },

    tweets: { type: [mongoose.Types.ObjectId], ref: 'Tweet' },

    // ... other fields
    following: { type: [mongoose.Types.ObjectId], ref: 'User' },
    followers: { type: [mongoose.Types.ObjectId], ref: 'User' },
}, {
    timestamps: true
})

const User:Model<IUser> =  mongoose.models.User || model('User', userSchema);

export default User;