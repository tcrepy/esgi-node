import config from "../config";
import {fetchHeaders, handleResponse} from "./Utils";
import {userService} from "./UserServices";

const route = `${config.apiUrl}/posts`;

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: fetchHeaders(),
        mode: "cors"
    };
    return fetch(`${route}/`, requestOptions).then(handleResponse);
};

const save = (title, link, description, categories) => {
    const user = userService.getCurrentUser();
    const requestOptions = {
        method: "POST",
        headers: fetchHeaders(),
        mode: 'cors',
        body: JSON.stringify({
            "title": title,
            "description": description,
            "link": link,
            "categories": categories,
            "user": {
                "_id": user.id,
                "pseudo": user.pseudo
            }
        })
    };
    return fetch(`${route}/`, requestOptions).then(handleResponse);
};

const like = (post) => {
    const user = userService.getCurrentUser();
    const requestOpt = {
        method: "PUT",
        headers: fetchHeaders(),
        mode: "cors",
        body: JSON.stringify({
            "post": post,
            "user": user
        })
    };

    return fetch(`${route}/upvote/${post._id}`, requestOpt).then(handleResponse);
}

export const postServices = {
    getAll,
    save,
    like
};