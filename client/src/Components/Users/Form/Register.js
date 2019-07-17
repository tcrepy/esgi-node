import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import {AssignmentInd} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import {LinkConstants} from "../../../_constants/link.constants";


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: red[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export const Register = (props) => {
    const classes = useStyles();
    return <Container component="main" maxWidth="xs"> <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}> <AssignmentInd/> </Avatar>
            <Typography component="h1" variant="h5"> Register </Typography>
            <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
                <TextField error={!!props.email_validation} helperText={props.email_validation} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={props.email} onChange={props.handleChange}/>
                <TextField error={!!props.password_validation} helperText={props.password_validation} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={props.password} onChange={props.handleChange}/>
                <TextField error={!!props.password_repeat_validation} helperText={props.password_repeat_validation ? props.password_repeat_validation : ""} variant="outlined" margin="normal" required fullWidth name="passwordRepeat" label="Repeat your password" type="password" id="passwordRepeat" autoComplete="password-repeat" value={props.passwordRepeat} onChange={props.handleChange}/>
                <TextField error={!!props.pseudo_validation} helperText={props.pseudo_validation} variant="outlined" margin="normal" required fullWidth id="pseudo" label="Pseudo" name="pseudo" autoComplete="pseudo" value={props.pseudo} onChange={props.handleChange}/>
                <div className={classes.wrapper}>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> Sign In </Button> {props.submitted &&
                <CircularProgress size={24} className={classes.buttonProgress}/>}
                </div>
                <Grid container> <Grid item> <NavLink to={LinkConstants.LOGIN} variant="body2">
                    {"Already have an account ? Sign in !"}
                </NavLink> </Grid> </Grid>
            </form>
        </div>
    </Container>
};