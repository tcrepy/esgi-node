import React from "react";
import {Actions} from "./action/Actions";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Bookmark} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import {CategoryPanel} from "./Components/CategoryPanel";

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    color: {
        backgroundColor: "#fe232a"
    },
    customColor: {
        backgroundColor: props => props.color
    },
    border: {
        borderColor: props => props.color,
        border: "solid 1px",
        borderRadius: "10px",
        marginTop: "20px"
    }
}));



export const CategoryItem = ({item}) => {
    const classes = useStyles(item);
    return <ListItem alignItems="center" className={classes.border}>
        <ListItemText primary={<a href={item.link}>{item.title}</a>} secondary={
            <React.Fragment>
                {item.description}
            </React.Fragment>
        }/>
      <CategoryPanel category={item}/>
      <Actions item={item}/> </ListItem>
};
