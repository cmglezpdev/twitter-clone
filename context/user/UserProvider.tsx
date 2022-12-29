import { useReducer, FC, ReactNode } from 'react';

import { userReducer } from './userReducer';
import { UserContext } from './UserContext';
import { IUser } from '../../interfaces';
import { dbUsers } from '../../database';
import { twitterApi } from '../../api/twitterApi';

export interface IUserState {
    user?: IUser
}

const INITIAL_STATE: IUserState = {
    user: undefined
}

export const UserProvider:FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setUser = (id: string) => {

        twitterApi.get(`/users/${id}`)
            .then(({data: user}) => {
                if( !user ) return null;
                dispatch({ type: '[User] - set User', payload: user });
            }).catch(error => {
                console.log(error);
            })
    }

    const deleteUser = () => dispatch({ type: '[User] - delete User' });



    return (
        <UserContext.Provider
            value={{
                ...state,

                // methods
                setUser,
                deleteUser,
            }}
        >
            { children }
        </UserContext.Provider>
    )

}
