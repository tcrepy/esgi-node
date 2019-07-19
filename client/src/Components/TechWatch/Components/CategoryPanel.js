import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button} from "@material-ui/core";
const useCategoryStyles= makeStyles(theme => ({
    category: {
        backgroundColor: props => props.color,
        marginRight: 20,
        '&:hover': {
            backgroundColor: props => props.color,
            filter: "brightness(120%) !important"
        }
    }
}));
export const CategoryPanel = ({category}) => {
    const classesCategory = useCategoryStyles(category);
    return <Button variant="contained" color="primary" className={classesCategory.category}>
        {category.title}
    </Button>;
};