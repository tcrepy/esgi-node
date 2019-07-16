import * as React from 'react';
import '../../assets/css/header.css';
import {NavLink} from 'react-router-dom';
import {withUser} from "../../Provider/UserProvider";

export const Header = withUser(({user}) => {
    return <header>
        <div className="logo">
            <NavLink to="/list">Tech Watch</NavLink>
        </div>
        <div className="links">
            <ul>
                {user.token ? <li><NavLink to="/logout">Logout</NavLink></li> :
                <li><NavLink to="/login">Login</NavLink></li>}
                {!user.token && <li><NavLink to="/register">Register</NavLink></li>}
            </ul>
        </div>
    </header>;
});