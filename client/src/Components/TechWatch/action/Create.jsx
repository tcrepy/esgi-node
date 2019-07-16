import React, {useContext, useState} from 'react';
import {PostContext} from "../../../Context/PostContext";

export const Create = () => {
    const [title, setTitle] = useState("");
    const context = useContext(PostContext);
    const handleChange = (e) => {
        const {value} = e.target;
        setTitle(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        context.NewPost(title);
        setTitle("");
    };

    return <div className="createForm">
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={title} onChange={handleChange}/>
            <button type="submit">Send</button>
        </form>
    </div>
        ;

}