import { createContext } from "react";
import { IUser } from "../../interfaces";


export interface IUserConext {
    user?: IUser;

    // methods
    setUser: (id: string) => void,
    deleteUser: () => void,
}



export const UserContext = createContext({} as IUserConext);