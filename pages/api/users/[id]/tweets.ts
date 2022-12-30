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
            const tweetsId = await User.findById(id).select('tweets').lean();
            if( !tweetsId )
                return res.status(400).json({ message: 'User no found' });

                const tweets = await Tweet.find({ _id: { $in: tweetsId.tweets } }).sort({ createdAt: 'asc' }).lean();
            await db.disconnect();
            return res.status(200).json( tweets );
        }

        if( type === 'Likes' ) {
            const tweetsId = await User.findById(id).select('likes').lean();
            if( !tweetsId )
                return res.status(400).json({ message: 'User no found' });
            
            const tweets = await Tweet.find({ _id: { $in: tweetsId.likes } }).sort({ createdAt: 'asc' }).lean();
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
