import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CategoryPanel} from "./Components/CategoryPanel";
import {LinkConstants} from "../../_constants/link.constants";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    link: {
        textDecoration: "none"
    }
}));

export const PostItem = ({item, handleDelete}) => {
    const classes = useStyles();
    return <ListItem alignItems="center">
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
        <NavLink className={classes.link} to={`${LinkConstants.POST_LIST_CATEGORY}/${item.categories._id}`}><CategoryPanel category={item.categories}/></NavLink>
    </ListItem>
};
