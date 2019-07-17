import React from "react";
import {Actions} from "./action/Actions";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
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
            primary={item.title}
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
            }
        />
        <Actions item={item} handleDelete={handleDelete}/>
    </ListItem>
};