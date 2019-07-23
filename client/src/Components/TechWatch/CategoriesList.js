import * as React from "react";
import {PostItem} from "./PostItem";
import {useContext} from "react";
import {useEffect} from "react";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";
import {withAlert} from "../../Provider/AlertProvider";
import List from "@material-ui/core/List";
import {makeStyles} from '@material-ui/core/styles';
import {useMemo} from "react";
import {CategoryContext} from "../../Context/CategoryContext";
import {NavLink} from "react-router-dom";
import {CreateButton} from "../Nav/CreateButton";
import {CategoryItem} from "./CategoryItem";
import {Container} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export const CategoriesList = withAlert((alert) => {
    const context = useContext(CategoryContext);

    useEffect(() => {
        context.getCategories().catch(err => {
            alert.error(err.toString());
            history.push(LinkConstants.LOGIN);
        });
    }, []);
    const classes = useStyles();

    return useMemo(() => <Container maxWidth="md"><List className={classes.root}>
            {!context.fetched && <div>Loading</div>} {context.fetched && context.categories.length > 0 &&
        <ul>
            {
                context.categories.map((item, key) => <CategoryItem key={key} item={item}/>)
            }
        </ul>
        }{context.fetched && context.categories.length === 0 && <div>No Records</div>}
            <NavLink to={LinkConstants.CATEGORY_CREATE}><CreateButton/></NavLink>
        </List></Container>, [context.categories, context.fetched]
    )
});
