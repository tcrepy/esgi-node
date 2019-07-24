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
import {userService} from "../../_services/UserServices";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    link: {
        textDecoration: "none",
        color: theme.palette.text.primary,
        cursor: "pointer",
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    like: {
        color: theme.palette.text.hint,
        fontSize: "0.9em"
    },
    avatar: {
        backgroundColor: red[500],
    },
    avatarContainer: {
        width: "10%"
    },
    listItemContainer: {
        width: "70%"
    },
    categoryContainer: {
        width: "20%"
    }
}));

export const PostItem = ({item, handleDelete, handleLike}) => {
    const classes = useStyles();
    return <ListItem alignItems="center">
        <ListItemAvatar className={classes.avatarContainer}>
            <Avatar aria-label="Recipe" className={classes.avatar}>
                {item.user ? item.user.pseudo.toUpperCase().substr(0,1) : "TW"}
            </Avatar>
        </ListItemAvatar>


        <ListItemText className={classes.listItemContainer}
                      primary={<><a className={classes.link} href={item.link} target="_blank">{item.title}</a> - <a onClick={e => handleLike(e, item)} className={`${classes.like} ${classes.link}`}>{item.upvote.includes(userService.getCurrentUser().id) ? 'Unl' : 'L'}ike ({item.upvote.length})</a></>}
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                    >
                    {item.description.length > 256 ? `${item.description.substr(0, 256)}...` : item.description}
                    </Typography>
                </React.Fragment>
            }
        />
        <CategoryPanel className={classes.categoryContainer} category={item.categories}/>
    </ListItem>
};
