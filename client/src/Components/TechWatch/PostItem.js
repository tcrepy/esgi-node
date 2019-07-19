import React from "react";
import {Actions} from "./action/Actions";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import user from "../../assets/img/user.svg";
import {CategoryPanel} from "./Components/CategoryPanel";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
}));

export const PostItem = ({item, handleDelete}) => {
    console.log(item);
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
        {
            item.categories.map((category, key) => {
                category = JSON.parse(category);
                return <CategoryPanel key={key} category={category}/>
            })
        }
    </ListItem>
};