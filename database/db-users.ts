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

export const oAuthUser = async( oAuthEmail:string, oAuthName:string ) => {
    await db.connect();

    const user = await User.findOne({ email: oAuthEmail }).lean();
    if( user ) {
        await db.disconnect();
        const { _id, name, username, email } = user;
        return { _id, name, username, email };
    }

    // TODO: Verificar que no exista otro username igual
    const username = oAuthName.split('@')[0];
    const password = bcrypt.hashSync( username );
    const newUser = new User({ email: oAuthEmail, name: oAuthName, username, password });
    await newUser.save();
    db.disconnect();

    const { _id, name, email } = newUser;
    return { _id, name, username, email };
}