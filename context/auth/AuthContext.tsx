import { createContext } from "react";
import { IUser } from "../../interfaces";


export interface IAuthConext {
    isLogged: boolean;
    user?: IUser;

    // methods
    logInUser: (email: string, password: string) => void;
    signUpUser: (credentials: any) => Promise<void>;
}



export const AuthContext = createContext({} as IAuthConext);