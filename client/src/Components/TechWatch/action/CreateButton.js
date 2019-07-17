import React, {useContext, useState} from 'react';
import {PostContext} from "../../../Context/PostContext";
import Fab from "@material-ui/core/Fab";
import {Add} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LinkConstants} from "../../../_constants/link.constants";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        position: "fixed",
        bottom: 30,
        right: 50
    }
}));

export const CreateButton = () => {
    const classes = useStyles();
    return <NavLink to={LinkConstants.POST_CREATE}><Fab color="primary" aria-label="Add" className={classes.fab}> <Add/>
    </Fab></NavLink>;
};