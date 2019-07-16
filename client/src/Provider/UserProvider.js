import React, {useState} from "react";
import {userService} from "../_services/UserServices";
import {UserContext} from "../Context/UserContext";

export const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user: {},
        login: (email, password) => {
            return userService.login(email, password)
                .then(
                    user => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                user: user
                            }
                        });
                        return Promise.resolve(user);
                    },
                    error => {
                        throw new Error(error.toString());
                    }
                );
        },
        logout: () => {
        }
    });
    return <UserContext.Provider value={state}>
        {children}
    </UserContext.Provider>
};

export const withUser = Component => props => (
    <UserContext.Consumer>
        {store => <Component {...props} {...store} />}
    </UserContext.Consumer>
);