import React, {useContext} from 'react';
import {LoginContext} from "../../Context/LoginContext";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";

export const LogoutContainer = () => {
    const {user, logout} = useContext(LoginContext);
    if (user.token) {
        logout();
    }
    history.push(LinkConstants.LOGIN);
    return <></>
};
