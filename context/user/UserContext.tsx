import { createContext } from "react";
import { IUser } from "../../interfaces";


export interface IUserConext {
    user?: IUser;
    profileUser?: IUser;

    // methods
    setUser: (id: string) => void,
    deleteUser: () => void,
    setProfileUser: (id: string) => void,
    deleteProfileUser: () => void,
}



export const UserContext = createContext({} as IUserConext);