import { useReducer, FC, ReactNode, useCallback } from 'react';

import { userReducer } from './userReducer';
import { UserContext } from './UserContext';
import { IUser } from '../../interfaces';
import { twitterApi } from '../../api/twitterApi';

export interface IUserState {
    user?: IUser;
    profileUser?: IUser;
}

const INITIAL_STATE: IUserState = {
    user: undefined,
    profileUser: undefined,
}

export const UserProvider:FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setUser = useCallback( (id: string) => {
        twitterApi.get(`/users/${id}`)
            .then(({data: user}) => {
                if( !user ) return null;
                dispatch({ type: '[User] - set User', payload: user });
            }).catch(error => {
                console.log(error);
            })
    }, [])

    const deleteUser = useCallback( () => dispatch({ type: '[User] - delete User' }), []);
    
    const setProfileUser = useCallback( (id: string) => {
        twitterApi.get(`/users/${id}`)
        .then(({data: user}) => {
            if( !user ) return null;
            dispatch({ type: '[User] - set Profile User', payload: user });
        }).catch(error => {
            console.log(error);
        })
    }, [])
    
    const deleteProfileUser = useCallback(() => dispatch({ type: '[User] - delete profile User' }), []);
    
    
    return (
        <UserContext.Provider
            value={{
                ...state,

                // methods
                setUser,
                deleteUser,
                setProfileUser,
                deleteProfileUser,
            }}
        >
            { children }
        </UserContext.Provider>
    )

}
