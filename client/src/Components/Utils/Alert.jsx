import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
const useStyles = makeStyles(theme => ({
    conf: {
        backgroundColor: green[500],
        color: "white"
    },
}));
export const AlertError = ({message}) => <Box bgcolor="error.main" color="white">{message}</Box>;
export const AlertConf = ({message}) => {
    const classes = useStyles();
    return <Box className={classes.conf}>{message}</Box>;
};

