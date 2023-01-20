import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Tweet, User } from '../../../models';
import { db } from '../../../database';

type Data = 
    | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case 'POST':
            return createTweet(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
    
}

async function createTweet(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { userId = '', text = '' } = req.body;

    if( !mongoose.isValidObjectId(userId) )
        return res.status(400).json({ message: 'Invalid user id' });   

    // Add validations for text
    if( text.trim().length === 0 )
        return res.status(400).json({ message: 'Invalid tweet text' });
    
    try {
        db.connect();
        const user = await User.findById(userId);
        if( !user ) 
            return res.status(400).json({ message: 'User not found' });

        const tweet = new Tweet({
            user: userId,
            text
        })
        user.tweets.push(tweet._id);

        await Promise.all([tweet.save(), user.save()]);
        
        db.disconnect();
        return res.status(201).json({ message: 'Tweet created successfully' })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }


}
