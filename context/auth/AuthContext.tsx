import { createContext } from "react";
import { IUser } from "../../interfaces";


export interface IAuthConext {
    isLogged: boolean;
    user?: IUser;
}



export const AuthContext = createContext({} as IAuthConext);