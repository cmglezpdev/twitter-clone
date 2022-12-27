import { ReactNode, FC } from 'react';
import Head from "next/head"

interface Props {
    title: string;
    pageDescription: string;
    children: ReactNode;
}


export const AuthLayout:FC<Props> = ({  title, pageDescription, children }) => {
    return (
        <>
            <Head>
                <meta name='description' content={pageDescription} />
                <meta name='og:title' content={title} />
                <meta name='og:description' content={pageDescription} />
                <title>{ title }</title>
            </Head>
            <main>
                { children }
            </main>
        </>
    )
}
