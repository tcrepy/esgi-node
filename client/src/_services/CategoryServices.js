import config from "../config";
import {fetchHeaders, handleResponse} from "./Utils";

const route = `${config.apiUrl}/categories`;

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: fetchHeaders,
        mode: "cors"
    };
    return fetch(`${route}/`, requestOptions).then(handleResponse);
};

const save = (title, description, color) => {
    const requestOptions = {
        method: "POST",
        headers: fetchHeaders,
        mode: 'cors',
        body: JSON.stringify({
            "title": title,
            "description": description,
            "color": color
        })
    };
    return fetch(`${route}/`, requestOptions).then(handleResponse);
}

export const categoryServices = {
    getAll,
    save
};