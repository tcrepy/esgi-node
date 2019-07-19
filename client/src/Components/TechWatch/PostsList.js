import * as React from "react";
import {PostItem} from "./PostItem";
import {useContext} from "react";
import {PostContext} from "../../Context/PostContext";
import {useEffect} from "react";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";
import {withAlert} from "../../Provider/AlertProvider";
import List from "@material-ui/core/List";
import {makeStyles} from '@material-ui/core/styles';
import {useMemo} from "react";
import {CreateButton} from "../Nav/CreateButton";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {List as ListIcon} from "@material-ui/icons";
import {Container} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export const PostsList = withAlert((props) => {
    const context = useContext(PostContext);
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            props.error('You need to be connect to access to this page');
            history.push(LinkConstants.LOGIN);
        }
    });
    useEffect(() => {
        context.fetchList(props.category ? props.category._id : null).catch(err => {
            props.error(err.toString());
            history.push(LinkConstants.LOGIN);
        });
    }, [props.category]);

    const classes = useStyles();

    const handleDelete = (e, item) => {
        e.preventDefault();
        context.DeletePost(item)
            .then(() => props.success('Post has been well deleted'))
            .catch(err => props.error(err.toString()));
    };

    return useMemo(() => <Container maxWidth="md">
        {!props.category && <CardHeader title="Post list" align="center"/>}
        <List className={classes.root}>
            {!context.fetched && <div>Loading</div>} {context.fetched && context.posts.length > 0 &&
        <ul>
            {
                context.posts.map((item, key) => <PostItem key={key} item={item} handleDelete={handleDelete}/>)
            }
        </ul>
        }{context.fetched && context.posts.length === 0 && <div>No Records</div>}
        <NavLink to={LinkConstants.POST_CREATE}><CreateButton/></NavLink>
        </List></Container>, [context]
    )
});
