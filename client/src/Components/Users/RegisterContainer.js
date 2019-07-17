import React, {useContext, useState} from "react";
import {Register} from "./Form/Register";
import {UserContext} from "../../Context/UserContext";
import {alertConstants} from "../../_constants/alert.constants";
import {withAlert} from "../../Provider/AlertProvider";
import {LinkConstants} from "../../_constants/link.constants";
import {history} from "../../_helper/history";

const initialState = {
    submitted: false,
    email: "",
    pseudo: "",
    password: "",
    passwordRepeat: "",
    email_validation: "",
    password_validation: "",
    password_repeat_validation: "",
    pseudo_validation: ""
};

export const RegisterContainer = withAlert(({alert}) => {
    const context = useContext(UserContext);
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkForm()) {
            const {email, pseudo, password} = state;
            context.register(email, pseudo, password)
                .then(resp => {
                    alert(alertConstants.SUCCESS, `User registered !`);
                    history.push(LinkConstants.LOGIN)
                })
                .catch(err => {
                    alert(alertConstants.ERROR, err);
                });
        }
    };

    const checkForm = () => {
        setState(prevState => {
            return {
                ...prevState,
                password_repeat_validation: state.password !== state.passwordRepeat ? "Please use the same password in the two password fields" : ""
            }
        });
        setState(prevState => {
            return {
                ...prevState,
                password_validation: prevState.password === "" ? "Password field can't be empty" : ""
            }
        });
        setState(prevState => {
            return {
                ...prevState,
                email_validation: prevState.email === "" ? "Email field can't be empty" : ""
            }
        });
        setState(prevState => {
            return {
                ...prevState,
                pseudo_validation: prevState.pseudo === "" ? "Pseudo field can't be empty" : ""
            }
        });
        return (state.email !== "" && state.password !== "" && state.pseudo !== "" && state.password === state.passwordRepeat)
    };

    return <Register {...state} handleChange={handleChange} handleSubmit={handleSubmit}/>;
});