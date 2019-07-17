import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import {AlertContext} from "../../Context/AlertContext"
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core/styles';
import {alertConstants} from "../../_constants/alert.constants";


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));


const AlertContant = (props) => {
    const classes = useStyles();
    const {className, message, onClose, variant} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent className={clsx(classes[variant], className)} aria-describedby="client-snackbar" message={
            <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/> {message}
        </span>
        } action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                <CloseIcon className={classes.icon}/> </IconButton>,
        ]}/>
    );
};

AlertContant.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf([alertConstants.SUCCESS, alertConstants.INFO, alertConstants.WARNING, alertConstants.ERROR]).isRequired,
};


const Alert = () => (<AlertContext.Consumer>
    {value => {
        return <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }} open={value.open} autoHideDuration={value.duration} onClose={value.handleClose}>
            <AlertContant onClose={value.handleClose} variant={value.type} message={value.message}/>
        </Snackbar>
    }}
</AlertContext.Consumer>);

export default Alert;