import {userService} from "./UserServices";
import {authHeader} from "../_helper/auth-header";

export function handleResponse(response) {
    if (response.status === 204) {
        return true;
    }
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                // location.reload(true);
            }
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export const fetchHeaders = () => {
    return {
        ...authHeader(),
        "Accept": "application/json",
        'Content-Type': 'application/json'
    }
};