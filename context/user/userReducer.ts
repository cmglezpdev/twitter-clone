import { IUser } from '../../interfaces';
import { IUserState } from './UserProvider';

type UserAction = 
    | { type: '[User] - set User', payload: IUser }
    | { type: '[User] - delete User' }
    | { type: '[User] - set Profile User', payload: IUser }
    | { type: '[User] - delete profile User' }

export const userReducer = ( state: IUserState, action: UserAction ) => {
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

        default:
            return state;
    }
}