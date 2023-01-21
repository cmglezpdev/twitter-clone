import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import { Tweet, User } from '../../../models';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return pinTweet(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}


async function pinTweet(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { tweetId } = req.body; 

    const session = await getSession({ req })
    if( !session ) return res.status(403).json({ message: 'You are not logged. Please, log in' })
    if( !isValidObjectId(tweetId) ) return res.status(400).json({ message: 'The tweet id is not valid' })
    const userId = session.user._id;

    try {
        const [user, tweet] = await Promise.all([ 
            User.findById(userId),
            Tweet.findById(tweetId).lean()
        ])
        if( !tweet ) return res.status(404).json({ message: 'Tweet not found!' })
        if( !user ) return res.status(400).json({ message: 'Invalid User' })

        if( JSON.parse(JSON.stringify(tweet.user)) !== userId )
            return res.status(403).json({ message: 'You dont have access to pined this tweet' })

        user.pined = tweetId;

        await user.save();
        return res.status(200).json({ message: 'Tweet pined successful' })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error. Please, see server logs' });
    }
}
