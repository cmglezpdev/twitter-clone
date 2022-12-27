import { NextRequest, NextResponse } from "next/server";




export function middleware(req:NextRequest) {
    if( req.nextUrl.pathname === '/'){
        return NextResponse.redirect( new URL('/home', req.url ) )
    }
}

export const config = {
    matcher: ['/']
}