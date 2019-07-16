import React from "react";
import {Actions} from "./action/Actions";

export const ListItem = ({item}) => <li>
    {item.title}
    <Actions item={item}/>
    </li>;