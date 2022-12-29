import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { IUser } from '../../../../interfaces';
import { User } from '../../../../models';
import { validations } from '../../../../services';

type Data = 
    | { message: string }
    | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getUser(req, res);
     
        case 'PUT':
            return updateUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
}

async function getUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;

    try {
        db.connect();
        const user = await User.findById(id).lean();
        db.disconnect();
        
        if( !user ) 
            return res.status(404).json({ message: 'User not found' })
        
        delete user.password;
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;

    const { name, username, email, bio, location, website, brith } = req.body;
    if( !validations.isValidName(name) ) return res.status(400).json({ message: 'Invalid name' });
    if( bio && bio.length === 0 && validations.isValidBio(bio) ) return res.status(400).json({ message: 'Invalid bio' });
    if( location && location.length === 0 && validations.isValidLocation(location) ) return res.status(400).json({ message: 'Invalid location' });
    if( website && website.length === 0 && validations.isValidWebsite(website) ) return res.status(400).json({ message: 'Invalid website' });
    if( !validations.isValidBirthday(brith) ) return res.status(400).json({ message: 'Invalid birth' });
    
    // if( !validations.isValidUsername(username) ) return res.status(400).json({ message: 'Invalid username' });
    // if( !validations.isValidEmail(email) ) return res.status(400).json({ message: 'Invalid email' });

    // TODO: que el username solo se pueda cambiar una vez
    // TODO: que no se actualice el password sin antes verificar la contraseña actual

    const updated = req.body;
    delete updated.currentPassword;
    delete updated.newPassword;
    delete updated.confirmPassword;

    try {
        db.connect();    
        const user = await User.findByIdAndUpdate(id, updated, { new: true }).lean();
        if( !user )
            return res.status(400).json({ message: 'User no found' });

        delete user.password;
        db.disconnect();
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' })
    }
}
