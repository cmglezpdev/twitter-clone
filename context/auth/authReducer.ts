import { IUser } from '../../interfaces';
import { IAuthState } from './AuthProvider';

type AuthAction = 
    | { type: '[auth] - login', payload: IUser }
    | { type: '[auth] - logout' }



export const authReducer = ( state: IAuthState, action: AuthAction ) => {
    switch( action.type ) {
        case '[auth] - login':
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }
        
        case '[auth] - logout':
            return {
                ...state,
                isLogged: false,
                user: undefined
            }

        default:
            return state;
    }
}