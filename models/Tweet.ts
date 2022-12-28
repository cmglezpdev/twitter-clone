import mongoose, { Schema, model, Model } from 'mongoose';
import { ITweet } from '../interfaces';

const tweetSchema = new Schema({
    text     : { type: String, required: true },
    user     : { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    views    : { type: [mongoose.Types.ObjectId], ref: 'User' },
    likes    : { type: [mongoose.Types.ObjectId], ref: 'User' },
    retweets : { type: [mongoose.Types.ObjectId], ref: 'User' },
    comments : { type: [mongoose.Types.ObjectId], ref: 'Tweet' },
}, {
    timestamps: true
})

const Tweet:Model<ITweet> =  mongoose.models.Tweet || model('Tweet', tweetSchema);

export default Tweet;