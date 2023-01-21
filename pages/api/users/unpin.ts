import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { User } from '../../../models';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return unpinTweet(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}


async function unpinTweet(req: NextApiRequest, res: NextApiResponse<Data>) {

    const session = await getSession({ req })
    if( !session ) return res.status(403).json({ message: 'You are not logged. Please, log in' })
    const userId = session.user._id;

    try {
        const user = await User.findById(userId);
        if( !user ) return res.status(400).json({ message: 'Invalid User' })
        
        user.pined = undefined;
        await user.save();
        return res.status(200).json({ message: 'Tweet unpined successful' })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error. Please, see server logs' });
    }
}
