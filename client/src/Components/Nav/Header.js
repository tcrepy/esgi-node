// import * as React from 'react';
// import '../../assets/css/header.css';
// import {NavLink} from 'react-router-dom';
// import {withUser} from "../../Provider/UserProvider";
// import {LinkConstants} from "../../_constants/link.constants";
//
// export const Header = withUser(({user}) => {
//     return <header>
//         <div className="logo">
//             <NavLink to="/list">Tech Watch</NavLink>
//         </div>
//         <div className="links">
//             <ul>
//                 {user.token ? <>
//                     <li><NavLink to={LinkConstants.CATEGORY_LIST}>Categories</NavLink></li>
//                     <li><NavLink to={LinkConstants.LOGOUT}>Logout</NavLink></li> </> :
//                     <li><NavLink to={LinkConstants.LOGIN}>Login</NavLink></li>} {!user.token &&
//             <li><NavLink to={LinkConstants.REGISTER}>Register</NavLink></li>}
//             </ul>
//         </div>
//     </header>;
// });

import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {NavLink} from "react-router-dom";
import {LinkConstants} from "../../_constants/link.constants";
import {Bookmark, Search, List as ListIcon} from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import {withUser} from "../../Provider/LoginProvider";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {userService} from "../../_services/UserServices";

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.common.white,
        textDecoration: "none"
    },
    linkWhite: {
        color: theme.palette.common.black,
        textDecoration: "none"
    },
    grow: {
        flexGrow: 1,
        marginBottom: 10
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export const Header = withUser(({user}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu anchorEl={anchorEl} anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }} id={menuId} keepMounted transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}><NavLink className={classes.linkWhite} to={`${LinkConstants.USER_PROFIL}/${userService.getCurrentUser().id}`}>Profile</NavLink></MenuItem>
            <MenuItem onClick={handleMenuClose}><NavLink className={classes.linkWhite} to={LinkConstants.LOGOUT}>Log out</NavLink></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    return (
        <div className={classes.grow}>
            <AppBar position="static"> <Toolbar>
                <div className={classes.sectionMobile}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon/> </IconButton></div>
                {/*TODO::include sidebar with Drawer component*/}
                <Typography className={classes.title} variant="h6" noWrap>
                    <NavLink className={classes.link} to={LinkConstants.POST_LIST}>TechWatch</NavLink> </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Search/>
                    </div>
                    <InputBase placeholder="Search…" classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }} inputProps={{'aria-label': 'Search'}}/>
                </div>
                <div className={classes.grow}/>
                {user.token && <div className={classes.sectionDesktop}>
                    <Tooltip title="List posts">

                    <IconButton aria-label="List posts" color="inherit">
                        <NavLink className={classes.link} to={LinkConstants.POST_LIST}><ListIcon/></NavLink>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="List categories">
                        <IconButton aria-label="List categories" color="inherit">
                            <NavLink className={classes.link} to={LinkConstants.CATEGORY_LIST}><Bookmark/></NavLink>
                        </IconButton>
                    </Tooltip>
                    <IconButton edge="end" aria-label="Account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                        <AccountCircle/> </IconButton>
                </div>} {!user.token && <div className={classes.sectionDesktop}>
                <NavLink className={classes.link} to={LinkConstants.LOGIN}><Button color="inherit">Login</Button></NavLink>
                <NavLink className={classes.link} to={LinkConstants.REGISTER}><Button color="inherit">Register</Button></NavLink>
            </div>}
            </Toolbar> </AppBar> {renderMenu}
        </div>
    );
});