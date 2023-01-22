import { FC, ReactNode, useContext } from 'react';
import Head from "next/head";
import { FooterAccount, LeftPanel, SideMenu, TopBar } from "../components";
import { AuthContext } from '../context/auth';
import { ToastContainer } from 'react-toastify';

interface Props {
    title: string;
    pageDescription: string;
    children: ReactNode;
}

export const AppLayout:FC<Props> = ( props ) => {
    const { title, pageDescription, children } = props;

    const { user } = useContext(AuthContext);

    return (
        <>
            <Head>
                <meta name='description' content={pageDescription} />
                <meta name='og:title' content={title} />
                <meta name='og:description' content={pageDescription} />
                <title>{ title }</title>
            </Head>

            <div className="w-screen h-screen grid grid-cols-twitter">
                <SideMenu />
                <div className='border-x-2 border-gray-200'>
                    <TopBar title="Home" />
                    { children }
                </div>
                <LeftPanel />
            </div>
            {
              !user && <FooterAccount />
            }

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                limit={2}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </> 

    )

}