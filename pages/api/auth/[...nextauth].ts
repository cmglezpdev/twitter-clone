import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials';

import { dbUsers } from '../../../database';

export const authOptions = {
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },

            async authorize( credentials ) {
                // TODO: Validate credentials with database
                const { email, password } = credentials!;
                return await dbUsers.checkUserEmailAndPassword(email, password);
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
    ],

    // Callbacks
    callbacks: {
        async jwt({ token, account, user }: any) {  
            if( account ) {
                token.accessToken = account.accessToken;
                switch( account.type ) {
                    case 'credentials':
                        token.user = user;
                        break;

                    case 'oauth':
                    // TODO: verificar in database
                    
                    console.log({ user, account })
                    break;
                }
            }

            return token;
        },

        async session({ session, token, user }: any) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    }
}

export default NextAuth(authOptions);