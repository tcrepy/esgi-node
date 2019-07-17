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
import {Assignment} from "@material-ui/icons";
import FilledInput from "@material-ui/core/FilledInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {CategoryContext} from "../../../Context/CategoryContext";

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

export const AddForm = ({title, link, description, category, handleChange, handleSubmit, submitted, categories, title_validation, link_validation, category_validation}) => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs"> <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> <Assignment/> </Avatar>
                <Typography component="h1" variant="h5"> New post </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField error={!!title_validation} helperText={title_validation} variant="outlined" margin="normal" required fullWidth id="title" label="Post title" name="title" autoComplete="title" autoFocus value={title} onChange={handleChange}/>
                    <TextField error={!!link_validation} helperText={link_validation} variant="outlined" margin="normal" required fullWidth id="link" label="Post link" name="link" autoComplete="link" value={link} onChange={handleChange}/>
                    <TextField variant="outlined" multiline={true} rows={4} margin="normal" required fullWidth id="description" label="Post description" name="description" autoComplete="description" value={description} onChange={handleChange}/>
                    <TextField error={!!category_validation} helperText={category_validation} variant="outlined" margin="normal" required fullWidth id="category" name="category" select label="Post category" value={category} onChange={handleChange} SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}>
                        {categories.map((value, key) =>
                            <MenuItem key={key} value={JSON.stringify(value)}> {value.title} </MenuItem>)}
                    </TextField>

                    <div className={classes.wrapper}>
                        <Button disabled={submitted} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Save</Button> {submitted &&
                    <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </div>
                </form>
            </div>
        </Container>
    );
};

