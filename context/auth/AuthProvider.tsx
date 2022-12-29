import { useEffect, useReducer, FC, ReactNode, useContext } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { UserContext } from '../user';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { IUser } from '../../interfaces';
import { twitterApi } from '../../api';

export interface IAuthState {
    isLogged: boolean;
    user?: IUser
}

const INITIAL_STATE: IAuthState = {
    isLogged: false,
    user: undefined
}


export const AuthProvider:FC<{ children: ReactNode }> = ({ children }) => {

    const { status, data } = useSession();
    const { setUser, deleteUser } = useContext(UserContext);
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    useEffect(() => {
        if( status === 'authenticated' ) {
            dispatch({ type: '[auth] - login', payload: data?.user as IUser })
            setUser((data.user as IUser)._id);
        }
    }, [status, data, setUser])

    const logInUser = (email: string, password: string) => {
        signIn('credentials', { email, password, callbackUrl: '/' })
    }

    const signUpUser = async ( credentials: any ) => {
        const { email = '', password = '' } = credentials;

        try {
            await twitterApi.post('/users/create', credentials);
            logInUser(email, password);
            deleteUser();
        } catch (error) {
            console.log(error);            
        }
    }

    const logOutUser = () => {
        dispatch({ type: '[auth] - logout' });
        signOut({ callbackUrl: '/auth/login' });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

                // methods
                logInUser,
                signUpUser,
                logOutUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}
