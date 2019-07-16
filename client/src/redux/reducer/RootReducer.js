import {combineReducers} from "redux";
import {authentication} from "./User/AuthentificationReducer";
import {alert} from "./AlertReducer";
import {registration} from "./User/RegisterReducer";

const rootReducer = combineReducers({
    alert
});

export default rootReducer;