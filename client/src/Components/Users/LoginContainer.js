import React, {useContext, useMemo, useState} from 'react';
import {SignIn} from "./Form/Login";
import {UserContext} from "../../Context/UserContext";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";
import {withAlert} from "../../Provider/AlertProvider";

const initalState = {
    email: '',
    password: '',
    submitted: false,
    loggedOut: false,
    loggingIn: false
};

export const LoginContainer = withAlert(({success, error, warning}) => {
    const context = useContext(UserContext);
    const [state, setState] = useState(initalState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setState(prevState => {
            return {...prevState, submitted: true, loggingIn: true}
        });
        const {email, password} = state;
        if (email && password) {
            context.login(email, password)
                .then(user => {
                    success('Logged in !');
                    history.push(LinkConstants.POST_LIST);
                })
                .catch(err => {
                    setState(initalState);
                    error(err.toString());
                });
        } else {
            warning("You have to enter your mail and your password to continue");
            setState(prevState => {
                return {...prevState, submitted: false, loggingIn: false}
            });
        }
    };

    const {email, password, submitted, loggingIn, loggedOut} = state;
    return useMemo(() => <SignIn email={email} password={password} submitted={submitted} handleChange={handleChange} handleSubmit={handleSubmit} loggingIn={loggingIn} loggedOut={loggedOut}/>, [state]);
});
