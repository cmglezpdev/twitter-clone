import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { ITweet } from '../../../interfaces';
import { Tweet } from '../../../models';

type Data = 
    | { message: string }
    | ITweet

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getTweet(req, res);
     
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

async function getTweet(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { id } = req.query;
    try {
        db.connect();
        const tweet = await Tweet.findById(id).lean();
        db.disconnect();
        
        if( !tweet ) 
            return res.status(404).json({ message: 'Tweet not found' })

        return res.status(200).json(tweet);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}