import React from 'react';
import Fab from "@material-ui/core/Fab/index";
import {Add} from "@material-ui/icons/index";
import makeStyles from "@material-ui/core/styles/makeStyles";


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
    return <Fab color="primary" aria-label="Add" className={classes.fab}> <Add/>
    </Fab>;
};