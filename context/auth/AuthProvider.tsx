import { useEffect, useReducer, FC, ReactNode, useContext, useCallback } from 'react';
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

    const logInUser = useCallback( (email: string, password: string) => {
        signIn('credentials', { email, password, callbackUrl: '/' })
    }, [])

    // TODO: Cambiar todo el mecanismo para que devuelva un objeto con el mensaje y el error si existe
    // en ves de usar el trycatch(En el UserProvider también)
    const signUpUser = useCallback( async ( credentials: any ) => {
        const { email = '', password = '' } = credentials;
        await twitterApi.post('/users/create', credentials);
        logInUser(email, password);
        deleteUser();

    }, [deleteUser, logInUser])

    const logOutUser = useCallback( () => {
        dispatch({ type: '[auth] - logout' });
        signOut({ callbackUrl: '/auth/login' });
    }, [])

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
