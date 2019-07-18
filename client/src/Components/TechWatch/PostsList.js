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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        paddingLeft: 40
    }
}));

export const PostsList = withAlert((alert) => {
    const context = useContext(PostContext);

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            alert.error('You need to be connect to access to this page');
            history.push(LinkConstants.LOGIN);
        }
    });
    useEffect(() => {
        context.fetchList().catch(err => {
            alert.error(err.toString());
            history.push(LinkConstants.LOGIN);
        });
    }, []);

    const classes = useStyles();

    const handleDelete = (e, item) => {
        e.preventDefault();
        context.DeletePost(item)
            .then(() => alert.success('Post has been well deleted'))
            .catch(err => alert.error(err.toString()));
    };

    return useMemo(() => <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="left" className={classes.title}>
            Posts list
        </Typography>
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