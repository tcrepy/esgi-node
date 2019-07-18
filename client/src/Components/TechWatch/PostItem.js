import React from "react";
import {Actions} from "./action/Actions";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from '@material-ui/core/Button';
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import user from "../../assets/img/user.svg";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
}));

export const PostItem = ({item, handleDelete}) => {
    const classes = useStyles();
    return <ListItem alignItems="center">
        <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user} />
        </ListItemAvatar>
        <ListItemText
            primary={<a href={item.link} target="_blank">{item.title}</a>}
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >

                    </Typography>
                    {item.description}
                    <div>
                        {item.categories.map(c => <Button variant="outlined" color="primary">{c}</Button>)}
                    </div>
                </React.Fragment>
            }
        />
        <Actions item={item} handleDelete={handleDelete}/>
    </ListItem>
};
