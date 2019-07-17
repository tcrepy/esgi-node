import * as React from 'react';
import '../../assets/css/header.css';
import {NavLink} from 'react-router-dom';
import {withUser} from "../../Provider/UserProvider";
import {LinkConstants} from "../../_constants/link.constants";

export const Header = withUser(({user}) => {
    return <header>
        <div className="logo">
            <NavLink to="/list">Tech Watch</NavLink>
        </div>
        <div className="links">
            <ul>
                {user.token ? <>
                    <li><NavLink to={LinkConstants.CATEGORY_LIST}>Categories</NavLink></li>
                    <li><NavLink to={LinkConstants.LOGOUT}>Logout</NavLink></li> </> :
                    <li><NavLink to={LinkConstants.LOGIN}>Login</NavLink></li>} {!user.token &&
            <li><NavLink to={LinkConstants.REGISTER}>Register</NavLink></li>}
            </ul>
        </div>
    </header>;
});