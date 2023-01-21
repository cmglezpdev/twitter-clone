import { IUser } from '../../interfaces';
import { IUserState } from './UserProvider';

type UserAction = 
    | { type: '[User] - set User', payload: IUser }
    | { type: '[User] - delete User' }
    | { type: '[User] - set Profile User', payload: IUser }
    | { type: '[User] - delete profile User' }
    | { type: '[User] - Follow/Unfollow User', payload: string }
    | { type: '[User] - Pin Tweet', payload: string }
    | { type: '[User] - Unpin Tweet' }

export const userReducer = ( state: IUserState, action: UserAction ) : IUserState => {
    switch( action.type ) {
        case '[User] - set User':
            return {
                ...state,
                user: action.payload
            }

        case '[User] - delete User':
            return {
                ...state,
                user: undefined
            }
        
        case '[User] - set Profile User':
            return {
                ...state,
                profileUser: action.payload
            }

        case '[User] - delete profile User':
            return {
                ...state,
                profileUser: undefined
            }

        case '[User] - Pin Tweet':
            if( !state.user )
                throw new Error('There is not any user registered');

            return {
                ...state,
                user: {
                    ...state.user,
                    pined: action.payload
                }
            }
            
        case '[User] - Unpin Tweet':
            if( !state.user )
                throw new Error('There is not any user registered');
        
            return {
                ...state,
                user: {
                    ...state.user,
                    pined: undefined
                }
            }

        case '[User] - Follow/Unfollow User':
            if( !state.user )
                throw new Error('There is not any user registered');    
            
            let following = []
            if( state.user.following.includes(action.payload) )
                following = state.user.following.filter(user => user !== action.payload)
            else following = [...state.user.following, action.payload];
            
            return {
                ...state,
                user: {
                    ...state.user,
                    following
                }
            }
            
        default:
            return state;
    }
}