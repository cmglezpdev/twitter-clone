import { useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Image from 'next/image';

import { AppLayout } from '../layouts';
import { dbUsers } from '../database';
import { IUser } from '../interfaces';
import { ProfileSettingsModal } from '../components/modals';

import img from '../public/avatar.png'

interface Props {
    user: IUser;
}


const ProfilePage:NextPage<Props> = ({ user }) => {
    
    const [showSettingsProfile, setShowSettingsProfile] = useState(false);
    const { name, username, bio, followers, following } = user;

    return (
        <AppLayout
            title={`${name} (${username}) / Twitter`}
            pageDescription={ !bio ? `Profile of ${name} (${username})` : bio }
        >
            <header className='mt-[70px]'>
                <div className='relative'>
                    <div className='w-full h-[200px] bg-gray-500'>
                        {/* image without banner */}
                    </div>
                    <div className='absolute w-32 h-32 rounded-full p-1 bg-white left-4 -bottom-1'>
                       {/* Change by images */}
                       <Image src={img} alt='avatar' className='rounded-full w-full h-full' />
                    </div>
                    <div className='flex w-full justify-end mt-3'>
                        <button 
                            className='border-gray-400 hover:bg-gray-200 transition-colors border-2 text-lg font-bold py-2 px-4 rounded-full'
                            onClick={() => setShowSettingsProfile(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className='flex flex-col text-lg'>
                        <span className='font-bold text-xl'>{ name }</span>
                        <span className='text-gray-700'>@{ username }</span>
                        <p className='mt-3'>
                            { bio }
                        </p>
                    </div>
                </div>

                <div className='mt-3 flex'>
                    <div className='flex items-center'>
                        <span className='font-bold text-md mr-2'>{ following.length }</span>
                        <span className='text-gray-700'>Following</span>
                    </div>
                    <div className='ml-4'>
                        <span className='font-bold text-md mr-2'>{ followers.length }</span>
                        <span className='text-gray-700'>Followers</span>
                    </div>
                </div>

            </header>

            <ProfileSettingsModal 
                open={showSettingsProfile}
                closeModal={() => setShowSettingsProfile(false)}
                user={user}
            />

        </AppLayout>
    )
}

export default ProfilePage;



export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const users = await dbUsers.getUsers({});
    console.log(users);
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
