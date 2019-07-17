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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export const PostsList = withAlert((alert) => {
    const context = useContext(PostContext);
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

    return useMemo(() => <List className={classes.root}>
            {!context.fetched && <div>Loading</div>} {context.fetched && context.posts.length > 0 &&
        <ul>
            {
                context.posts.map((item, key) => <PostItem key={key} item={item} handleDelete={handleDelete}/>)
            }
        </ul>
        }{context.fetched && context.posts.length === 0 && <div>No Records</div>} </List>, [context]
    )
});