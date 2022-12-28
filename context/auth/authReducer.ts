import { IUser } from '../../interfaces';
import { IAuthState } from './AuthProvider';

type AuthAction = 
    | { type: '[auth] - login', payload: IUser }



export const authReducer = ( state: IAuthState, action: AuthAction ) => {
    switch( action.type ) {
        case '[auth] - login':
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }

        default:
            return state;
    }
}