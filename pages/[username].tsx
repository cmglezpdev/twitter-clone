import { useState, useContext, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'

import { AppLayout } from '../layouts';
import { dbUsers } from '../database';
import { IUser } from '../interfaces';
import { Header } from '../components/profile';
import { UserContext } from '../context/user';

interface Props {
    user: IUser;
}


const ProfilePage:NextPage<Props> = ({ user: ProfileUser }) => {
    
    const [user, setUser] = useState<IUser>(ProfileUser)
    const { profileUser, setProfileUser, deleteProfileUser } = useContext(UserContext);
    const { name, username, bio } = user;

    useEffect(() => {
        if( !profileUser ) { // si no he cargado todavia el usuario en el context
            setProfileUser(user._id);
            return;
        }
        if( user._id !== ProfileUser._id ) { // si cambie de un perfil a otro
            setUser(ProfileUser);
            setProfileUser(ProfileUser._id)
            return;
        }
        setUser(profileUser);

        return () => deleteProfileUser()

    }, [ProfileUser, profileUser, setProfileUser, deleteProfileUser, user._id])

    return (
        <AppLayout
            title={`${name} (${username}) / Twitter`}
            pageDescription={ !bio ? `Profile of ${name} (${username})` : bio }
        >
            <Header user={user} />

        </AppLayout>
    )
}

export default ProfilePage;


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const users = await dbUsers.getUsers({});
    
    const paths = users.map(({ username }) => ({
        params: { username }
    }))

    return {
        paths,
        fallback: "blocking"
    }
}


export const getStaticProps: GetStaticProps = async (ctx) => {

    const { username } = ctx.params as { username: string };
    const [ user, ...users ] = await dbUsers.getUsers({ username });

    if( !user )
        return { redirect: { destination: '/', permanent: false } }

    return {
        props: { user }
    }
}
