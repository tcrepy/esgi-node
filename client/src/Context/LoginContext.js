import {createContext} from "react";

export const LoginContext = createContext({
    user: {},
    login: () => {},
    logout: () => {}
});