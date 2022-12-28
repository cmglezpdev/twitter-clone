import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req:NextRequest | any) {
    if( req.nextUrl.pathname === '/'){
        return NextResponse.redirect( new URL('/home', req.url ) )
    }

    if(  req.nextUrl.pathname.startsWith('/auth') ){
        const session = await getToken({ req });

        if( session )
            return NextResponse.redirect( new URL('/home', req.url ) );
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/auth/login',
        '/auth/register',
    ]
}