import React, {useState} from "react";
import {userService} from "../_services/UserServices";
import {UserContext} from "../Context/UserContext";

export const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user: {},
        getById: id => {
            return userService.getById(id).then(user => {
                setState(prevState => {
                    return {...prevState, user: user}
                })
            }, err => {
                throw new Error(err.toString());
            })
        }
    });

    return <UserContext.Provider value={state}>
        {children}
    </UserContext.Provider>
}