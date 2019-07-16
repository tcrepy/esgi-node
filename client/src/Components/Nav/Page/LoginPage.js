import React from "react";
import {UserProvider} from "../../../Provider/UserProvider";
import {LoginContainer} from "../../Users/LoginContainer";

export const LoginPage = () => {
    return <UserProvider>
        <LoginContainer/>
    </UserProvider>
}