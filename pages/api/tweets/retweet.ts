import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Tweet, User } from '../../../models';
import { db } from '../../../database';
import { ITweet } from '../../../interfaces';

type Data = 
    | { message: string }
    | ITweet

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case 'PUT':
            return retweetTweet(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }   
}

async function retweetTweet(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { userId = '', tweetId = '' } = req.body;

    if( !mongoose.isValidObjectId(userId) )
        return res.status(400).json({ message: 'Invalid user id' });   

    if( !mongoose.isValidObjectId(tweetId) )
        return res.status(400).json({ message: 'Invalid tweet id' });   

    try {
        db.connect();
        const user = await User.findById(userId);
        if( !user ) 
            return res.status(400).json({ message: 'User not found' });

        const tweet = await Tweet.findById(tweetId);
        if( !tweet )
            return res.status(400).json({ message: 'Tweet not found' });

        const isRetweet = tweet.retweets.includes(userId);
        tweet.retweets = isRetweet
                ? tweet.retweets.filter(id => JSON.parse(JSON.stringify(id)) !== userId)
                : tweet.retweets.concat(userId);

        if( !user.retweets ) user.retweets = [];
        user.retweets = isRetweet
                ? user.retweets.filter(id => JSON.parse(JSON.stringify(id)) !== tweetId)
                : user.retweets.concat(tweetId);

        await Promise.all([tweet.save(), user.save()])
        db.disconnect();
        
        return res.status(200).json( tweet )

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }


}
