import * as React from 'react';
import '../../assets/css/header.css';
import {NavLink} from 'react-router-dom';

export const Header = ({loggedIn}) => <header>
    <div className="logo">
        <NavLink to="/list">Tech Watch</NavLink>
    </div>
    <div className="links">
        <ul>
            <li><NavLink to="/login">{loggedIn ? "Log out" : "Login"}</NavLink></li>
        </ul>
    </div>
</header>;