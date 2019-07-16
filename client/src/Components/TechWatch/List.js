import * as React from "react";
import {ListItem} from "./ListItem";
import {useContext} from "react";
import {PostContext} from "../../Context/PostContext";
import {useEffect} from "react";
import {history} from "../../_helper/history";
import {LinkConstants} from "../../_constants/link.constants";

export const List = () => {
    const context = useContext(PostContext);

    useEffect(() => {
        context.fetchList().catch(err => {
            console.log(err);
            history.push(LinkConstants.LOGIN);
        });
    }, []);

    return (<>
        {!context.fetched && <div>Loading</div>} {context.fetched && context.posts.length > 0 &&
        <ul>
            {
                context.posts.map((item, key) => <ListItem key={key} item={item}/>)
            }
        </ul>
        }{context.fetched && context.posts.length === 0 && <div>No Records</div>} </>
    )
};