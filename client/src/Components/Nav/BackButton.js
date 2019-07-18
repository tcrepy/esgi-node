import React from 'react';
import Fab from "@material-ui/core/Fab/index";
import {KeyboardBackspace} from "@material-ui/icons/index";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        position: "fixed",
        top: 100,
        left: 50
    }
}));

export const BackButton = () => {
    const classes = useStyles();
    return <Fab color="primary" aria-label="Add" className={classes.fab}> <KeyboardBackspace/>
    </Fab>;
};