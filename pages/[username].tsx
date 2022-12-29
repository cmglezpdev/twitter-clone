import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';

import { AppLayout } from '../layouts';
import { dbUsers } from '../database';
import { IUser } from '../interfaces';
import { Header } from '../components/profile';

interface Props {
    user: IUser;
}


const ProfilePage:NextPage<Props> = ({ user }) => {
    
    const { name, username, bio } = user;

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




// TODO: ARREGLAR EL NULL DE AQUI
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
