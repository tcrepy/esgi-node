import React, {useContext, useState} from 'react';
import {SignIn} from "./Login";
import {UserContext} from "../../Context/UserContext";
import {history} from "../../_helper/history";

const initalState = {
    email: '',
    password: '',
    submitted: false,
    loggedOut: false,
    loggingIn: false
};

export const LoginContainer = () => {
    const context = useContext(UserContext);
    // reset login status
    if (localStorage.user) {
        context.logout();
    }
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
                    history.push('/list');
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