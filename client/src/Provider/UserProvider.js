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
            setState(prevState => {
                return {
                    ...prevState,
                    user: {}
                }
            });
            userService.logout();
            return Promise.resolve(true);
        },
        register: (email, pseudo, password) => {
            const user = {email, pseudo, password};
            return userService.register(user).then(user => {
                console.log(user);
            }, error => {
                throw new Error(error.toString());
            })
        }
    });
    return <UserContext.Provider value={state}>
        {children}
    </UserContext.Provider>
};

export const withUser = Component => props => {
    return <UserContext.Consumer>
        {store => {
            return <Component {...props} {...store} />
        }
        }</UserContext.Consumer>
};