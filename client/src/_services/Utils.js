import {userService} from "./UserServices";
import {authHeader} from "../_helper/auth-header";

export function handleResponse(response) {
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

export const fetchHeaders = {...authHeader(), 'Content-Type': 'application/json'};