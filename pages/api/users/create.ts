import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { validations } from '../../../services';
import { User } from '../../../models';
import { db } from '../../../database';

type Data = 
    | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case 'POST':
            return createUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
    
}

async function createUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { name = '', email = '', password = '' } = req.body;

    if( name.trim().length < 3 ) 
        return res.status(400).json({ message: 'Name must be at least 3 characters long' })
    if( !validations.isValidEmail(email) )
        return res.status(400).json({ message: 'Invalid email' })
    if( password.trim().length < 8 )
        return res.status(400).json({ message: 'Password must be at least 8 characters long' })
    
    // TODO: Verificar que no exista otro username igual
    const username = email.split('@')[0];

    try {
        db.connect();
        
        const user = new User({
            name,
            email,
            username,
            password: bcrypt.hashSync(password.trim())
        })

        await user.save();
        db.disconnect();
        return res.status(201).json({ message: 'User created successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
