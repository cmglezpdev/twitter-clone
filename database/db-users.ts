import bcrypt from 'bcryptjs';
import { User } from '../models';
import { validations } from '../services';
import { db } from '.'


export const checkUserEmailAndPassword = async ( email: string, password: string ) => {

    if( !validations.isValidEmail(email) )
        return null;
    if( !validations.isValidPassword(password) )
        return null;
    
    await db.connect();
    const user = await User.findOne({ email }).lean();
    if( !user ) return null;
    
    if( !bcrypt.compareSync(password, user.password!) )
        return null;

    const { _id, name, username } = user;

    await db.disconnect();
    return {
        _id,
        name,
        username,
        email,
    }
}