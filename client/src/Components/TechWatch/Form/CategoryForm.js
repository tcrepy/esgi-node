import React from 'react';
import Avatar from '@material-ui/core/Avatar/index';
import Button from '@material-ui/core/Button/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import TextField from '@material-ui/core/TextField/index';
import Typography from '@material-ui/core/Typography/index';
import {makeStyles} from '@material-ui/core/styles/index';
import Container from '@material-ui/core/Container/index';
import CircularProgress from "@material-ui/core/CircularProgress/index";
import {red} from "@material-ui/core/colors/index";
import {Bookmark} from "@material-ui/icons";
import {GithubPicker} from 'react-color';

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
    menu: {
        width: 200,
    }
}));

export const CategoryForm = ({title, color, description, handleChange, handleSubmit, submitted, setColor}) => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs"> <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> <Bookmark/> </Avatar>
                <Typography component="h1" variant="h5"> New Category </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="title" label="Category title" name="title" autoComplete="title" autoFocus value={title} onChange={handleChange}/>
                    <TextField variant="outlined" multiline={true} rows={4} margin="normal" required fullWidth id="description" label="Category description" name="description" autoComplete="description" value={description} onChange={handleChange}/>
                    <TextField disabled={true   } variant="outlined" margin="normal" required fullWidth id="color" label="Category color" name="color" autoComplete="color" value={color}/>
                    <GithubPicker width={262} colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']} onChange={setColor}/>
                    <div className={classes.wrapper}>
                        <Button disabled={submitted} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Save</Button> {submitted &&
                    <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </div>
                </form>
            </div>
        </Container>
    );
};

