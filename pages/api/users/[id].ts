import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = 
    | { message: string }
    | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getUser(req, res);
     
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

async function getUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { id } = req.query;
    console.log(id);

    try {
        db.connect();
        const user = await User.findById(id).lean();
        db.disconnect();
        
        if( !user ) 
            return res.status(404).json({ message: 'User not found' })

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}