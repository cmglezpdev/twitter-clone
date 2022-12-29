import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../../database';
import { IUser } from '../../../../interfaces';
import { User } from '../../../../models';

type Data = 
    | { message: string }
    | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'PUT':
            return followUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

async function followUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;
    const session = await getSession({ req });

    // TODO: verificar que se este logeado desde los middlewares
    if( !session ) {
        return res.status(401).json({ message: 'Unauthorized. Please, log in' });
    } 
    
    try {
        db.connect();
        const [userlogged, userToFollow] = await Promise.all([
                User.findById( (session.user as IUser)._id ),
                User.findById(id)
        ]);

        if( !userlogged ) {
            return res.status(404).json({ message: 'Logged user not found' });
        }
        if( !userToFollow ) {
            return res.status(404).json({ message: 'User to follow not found' })
        }
        
        const userLoggedId = JSON.parse(JSON.stringify(userlogged._id));
        const userToFollowId = JSON.parse(JSON.stringify(userToFollow._id));

        console.log({ userLoggedId, userToFollowId })
        console.log({ userlogged, userToFollow })

        if( userlogged.following.includes( userToFollowId ) ) {
            userlogged.following = userlogged.following.filter( id => JSON.parse(JSON.stringify(id)) !== userToFollowId );
            userToFollow.followers = userToFollow.followers.filter( id => JSON.parse(JSON.stringify(id)) !== userLoggedId );
        } else {
            userlogged.following.push( userToFollowId );
            userToFollow.followers.push( userLoggedId );
        }

        await Promise.all([ userlogged.save(), userToFollow.save() ]);
        return res.status(200).json({ message: 'User followed/unfollowed' });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
