import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { ITweet } from '../../../../interfaces';
import { Tweet, User } from '../../../../models';

type Data = 
    | { message: string }
    | ITweet[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case 'GET':
            return getTweets(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

async function getTweets(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;
    const { type = 'All' } = req.query;

    try {
        await db.connect();
        if( type === 'Tweets' || type === 'All' ) {
            const tweetsId = await User.findById(id).select('tweets retweets').lean();
            if( !tweetsId )
                return res.status(400).json({ message: 'User no found' });

            const tweets = await Tweet.find({ _id: { $in: tweetsId.tweets } }).sort({ createdAt: 'desc' }).lean();
            const retweeted = await Tweet.find({_id: { $in: tweetsId.retweets } }).sort({ createdAt: 'desc' }).lean();

            await db.disconnect();
            // return tweets ans rettweets sorted by createdAt
            
            return res.status(200).json( 
                [...tweets, ...retweeted].sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB.getTime() - dateA.getTime();
                })
            );
        }

        if( type === 'Likes' ) {
            const tweetsId = await User.findById(id).select('likes').lean();
            if( !tweetsId )
                return res.status(400).json({ message: 'User no found' });
            
            const tweets = await Tweet.find({ _id: { $in: tweetsId.likes } }).sort({ createdAt: 'desc' }).lean();
            await db.disconnect();
            return res.status(200).json( tweets );
        }    

        db.disconnect();
        return res.status(200).json([]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}
