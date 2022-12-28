import { useEffect, useReducer, FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { IUser } from '../../interfaces';

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
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);


    useEffect(() => {

        if( status === 'authenticated' ) {
            dispatch({ type: '[auth] - login', payload: data?.user as IUser })
        }

    }, [status, data])

    return (
        <AuthContext.Provider
            value={{
                ...state
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}
