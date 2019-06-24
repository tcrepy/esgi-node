import * as React from 'react';
import '../../assets/css/header.css';
import {Link} from 'react-router-dom';

export const Header = ({loggedIn}) => <header>
    <div className="logo">
        <Link to="/">Tech Watch</Link>
    </div>
    <div className="links">
        <ul>
            <li><Link to="/login">{loggedIn ? "Log out" : "Login"}</Link></li>
        </ul>
    </div>
</header>;