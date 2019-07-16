import * as React from 'react';
import '../../assets/css/header.css';
import {NavLink} from 'react-router-dom';
import {withUser} from "../../Provider/UserProvider";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";

export const Header = withUser(({user}) => {
    const context = useContext(UserContext);
    console.log(context.user);

    return <header>
        <div className="logo">
            <NavLink to="/list">Tech Watch</NavLink>
        </div>
        <div className="links">
            <ul>
                <li><NavLink to="/login">{user ? "Log out" : "Login"}</NavLink></li>
                {!user && <li><NavLink to="/register">Register</NavLink></li>}
            </ul>
        </div>
    </header>;
});