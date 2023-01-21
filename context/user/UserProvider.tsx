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
    
    const pinTweet = useCallback((tweetId: string | undefined) => {
        if( !tweetId ) {
            twitterApi.post(`/users/unpin`)
            .then((_) => dispatch({ type: '[User] - Unpin Tweet' }) )
            .catch(error => console.log(error) )
            return;
        }

        twitterApi.post(`/users/pin`, { tweetId })
        .then((_) => dispatch({ type: '[User] - Pin Tweet', payload: tweetId }) )
        .catch(error => console.log(error) )
    
    }, [])

    const onFollowUser = useCallback((userToFollowId: string) => {
        twitterApi.put(`/users/${userToFollowId}/follow`)
            .then(res => dispatch({ type: '[User] - Follow/Unfollow User', payload: userToFollowId }))
            .catch(error => console.log(error))
        }, [])

    return (
        <UserContext.Provider
            value={{
                ...state,

                // methods
                setUser,
                deleteUser,
                setProfileUser,
                deleteProfileUser,
                pinTweet,
                onFollowUser,
            }}
        >
            { children }
        </UserContext.Provider>
    )

}
