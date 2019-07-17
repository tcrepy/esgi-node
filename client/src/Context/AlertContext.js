import {createContext} from "react";
import {alertConstants} from "../_constants/alert.constants";

export const AlertInitialState = {
    message: "",
    type: alertConstants.SUCCESS,
    duration: 6000,
    open: false,
    handleClose: () => {},
    alert: () => {},
    success: () => {},
    error: () => {},
    info: () => {},
    warning: () => {}
};

export const AlertContext = createContext(AlertInitialState);