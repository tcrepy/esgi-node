import {combineReducers} from "redux";
import {listReducer} from "./Post/ListReducer";
import {authentication} from "./User/AuthentificationReducer";
import {alert} from "./AlertReducer";

const rootReducer = combineReducers({
    listReducer,
    authentication,
    alert
});

export default rootReducer;