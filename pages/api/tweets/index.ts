import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { ITweet } from '../../../interfaces';
import { Tweet } from '../../../models';

type Data = 
    | { message: string }
    | ITweet[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getTweets(req, res);
     
        default:
            return res.status(200).json({ message: 'Bad Request' })
    }
}

async function getTweets(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        db.connect();
        const tweets = await Tweet.find().sort('-updatedAt').lean();
        db.disconnect();
        
        return res.status(200).json(tweets);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}