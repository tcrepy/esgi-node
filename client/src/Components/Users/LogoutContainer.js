import React, {useContext} from 'react';
import {UserContext} from "../../Context/UserContext";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";

export const LogoutContainer = () => {
    const {user, logout} = useContext(UserContext);
    if (user.token) {
        logout();
    }
    history.push(LinkConstants.LOGIN);
    return <></>
};
