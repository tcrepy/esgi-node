import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../redux/reducer/RootReducer";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ));