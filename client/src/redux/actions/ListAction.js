import {authHeader} from "../../_helper/auth-header";

const urlApi = "http://localhost:3000";

export function fetchList() {
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                ...authHeader(),
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            mode: 'cors'
        };
        fetch(`${urlApi}/posts`, requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Error !');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                dispatch({
                    type: "FETCH_POSTS_RECEIVED",
                    payload: {
                        list: data,
                    }
                });
            })
            .catch(err => {
                return dispatch({
                    type: 'FETCH_POSTS_UNAUTHORIZED',
                    payload: {
                        fetched: true,
                        needConnexion: true,
                        error: err
                    }
                });
            });

        return {
            type: "FETCH_MOVIES_REQUESTED"
        };
    }

};

export function pushPost(dispatch) {
    fetch(`${urlApi}/posts`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJUZXN0IiwiaWF0IjoxNTU5OTMzNzA0LCJleHAiOjE1NTk5MzczMDR9.LEkiZpiSV2upPKy17vOaRdj_p-LVv-n5JZ5jtoAs0gA`
        },
        mode: 'cors',
        body: {

        }
    }).then(response =>{
        if (response.status !== 201) {
            throw new Error('Unable to fetch');
        } else {
            return response.json();
        }
    }).then(data => {
        dispatch({
            type: "FETCH_PUSH_POST_COMPLETED",
            payload: {
                list: data
            }
        })
    });
}