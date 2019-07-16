import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from "@material-ui/core/CircularProgress";
import {red} from "@material-ui/core/colors";
import {Lock} from "@material-ui/icons";
import {NavLink} from "react-router-dom";

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

export const SignIn = ({email, password, handleChange, handleSubmit, loggingIn}) => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs"> <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> <Lock/> </Avatar>
                <Typography component="h1" variant="h5"> Sign in </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={handleChange}/>
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={handleChange}/>
                    <div className={classes.wrapper}>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> Sign In </Button> {loggingIn &&
                    <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </div>
                    <Grid container> <Grid item> <NavLink to="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </NavLink> </Grid> </Grid>
                </form>
            </div>
        </Container>
    );
};
