import { FC, ReactNode } from "react";
import Head from "next/head";
import { LeftPanel, SideMenu, TopBar } from "../components";

interface Props {
    title: string;
    pageDescription: string;
    children: ReactNode;
}

export const AppLayout:FC<Props> = ( props ) => {

    const { title, pageDescription, children } = props;

    return (
        <>
            <Head>
                <meta name='description' content={pageDescription} />
                <meta name='og:title' content={title} />
                <meta name='og:description' content={pageDescription} />
                <title>{ title }</title>
            </Head>
            <main className="w-screen h-screen grid grid-cols-twitter">
                <SideMenu />
                <div>
                <TopBar title="Home" />
                    { children }
                </div>
                <LeftPanel />
            </main>
        </> 

    )

}