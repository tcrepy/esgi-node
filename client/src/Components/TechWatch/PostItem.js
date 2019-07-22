import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CategoryPanel} from "./Components/CategoryPanel";
import {LinkConstants} from "../../_constants/link.constants";
import {NavLink} from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    link: {
        textDecoration: "none"
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export const PostItem = ({item, handleDelete}) => {
    const classes = useStyles();
    return <ListItem alignItems="center">
        <ListItemAvatar>
            <Avatar aria-label="Recipe" className={classes.avatar}>
                {item.user ? item.user.pseudo.toUpperCase().substr(0,1) : "TW"}
            </Avatar>
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
                </React.Fragment>
            }
        />
        <CategoryPanel category={item.categories}/>
    </ListItem>
};
