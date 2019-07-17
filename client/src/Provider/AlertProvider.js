import React, {useState} from "react";
import {AlertContext} from "../Context/AlertContext";
import {alertConstants} from "../_constants/alert.constants";
import {UserContext} from "../Context/UserContext";

export const AlertProvider = ({children}) => {
    const [state, setState] = useState({
        message: "",
        type: alertConstants.SUCCESS,
        duration: 6000,
        open: false,
        handleClose: (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setState(prevState => {
                return {
                    ...prevState,
                    message: "",
                    open: false
                };
            });
        },
        alert: (type, message, duration = 6000) => {
            console.log(type, message);
            setState(prevState => {
                return {
                    ...prevState,
                    type,
                    message,
                    duration,
                    open: true
                }
            })
        },
        success: message => state.alert(alertConstants.SUCCESS, message),
        error: message => state.alert(alertConstants.ERROR, message),
        info: message => state.alert(alertConstants.INFO, message),
        warning: message => state.alert(alertConstants.WARNING, message),
    });
    return <AlertContext.Provider value={state}>
        {children}
    </AlertContext.Provider>
};

export const withAlert = Component => props => {
    return <AlertContext.Consumer>
        {store => {
            return <Component {...props} {...store} />
        }
        }</AlertContext.Consumer>
};