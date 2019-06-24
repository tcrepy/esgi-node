import * as React from "react";

const List = ({list, fetched = false}) =>
    <>
        {!fetched && <div>Loading</div>}
        {fetched && list.length > 0 && <ul>
            {
                list.map(item =>
                    <li key={item}>{item.name}</li>
                )
            }
        </ul>}
        {fetched && list.length === 0 && <div>No Records</div>}
    </>
;

export {List};