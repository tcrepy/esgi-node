import React, {useContext, useState} from 'react';
import {SignIn} from "./Login";
import {UserContext} from "../../Context/UserContext";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";

const initalState = {
    email: '',
    password: '',
    submitted: false,
    loggedOut: false,
    loggingIn: false
};

export const LoginContainer = () => {
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
                    history.push(LinkConstants.POST_LIST);
                })
                .catch(err => {
                    setState(initalState);
                    console.log(err);
                });
        }
    };

    const {email, password, submitted, loggingIn, loggedOut} = state;
    return <SignIn email={email} password={password} submitted={submitted} handleChange={handleChange} handleSubmit={handleSubmit} loggingIn={loggingIn} loggedOut={loggedOut}/>;
};
