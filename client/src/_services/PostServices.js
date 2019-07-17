import config from "../config";
import {fetchHeaders, handleResponse} from "./Utils";

const route = `${config.apiUrl}/posts`;

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: fetchHeaders,
        mode: "cors"
    };
    return fetch(`${route}/`, requestOptions).then(handleResponse);
};

const save = (title, description, link, categories) => {
    console.log({
        "title": title,
        "description": description,
        "link": link,
        "categories": categories
    });
    const requestOptions = {
        method: "POST",
        headers: fetchHeaders,
        mode: 'cors',
        body: JSON.stringify({
            "title": title,
            "description": description,
            "link": link,
            "categories": categories
        })
    };
    return fetch(`${route}/`, requestOptions).then(handleResponse);
}

export const postServices = {
    getAll,
    save
};