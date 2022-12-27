import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        // Credentials({
        //     name: 'Credentials',
        //     credentials: {
        //         email: { label: "Email", type: "email", placeholder: "Email" },
        //         password: { label: "Password", type: "password", placeholder: "Password" }
        //     },
        //     async authorize(credentials, req) {
        //         console.log(credentials);
        //         return null;
        //     }
        // })
    ]
}

export default NextAuth(authOptions);