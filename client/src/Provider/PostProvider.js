import React, {useState} from "react";
import {PostContext} from "../Context/PostContext";
import {authHeader} from "../_helper/auth-header";
import {postServices} from "../_services/PostServices";

const urlApi = "http://localhost:3000";

export const PostProvider = ({children}) => {
    const [state, setState] = useState({
        posts: [],
        fetched: false,
        fetchList: () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    ...authHeader(),
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            };
            return fetch(`${urlApi}/posts`, requestOptions)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Error !');
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    return new Promise((resolve) => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                posts: data,
                                fetched: true
                            }
                        });
                        resolve();
                    })
                })
                .catch(err => {
                    throw new Error("Veuillez vous connecter !");
                });
        },
        DeletePost: (item) => {
            return fetch(`${urlApi}/posts/${item._id}`, {
                method: 'DELETE',
                headers: {
                    ...authHeader(),
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                mode: 'cors',
            }).then(response => {
                if (response.status !== 204) {
                    return Promise.reject(response);
                } else {
                    return Promise.resolve();
                }
            }).then(() => {
                return new Promise(resolve => {
                    setState(prevState => {
                        return {
                            ...prevState,
                            posts: prevState.posts.filter(elem => elem._id !== item._id)
                        }
                    });
                    resolve();
                });
            }).catch(err => {
                throw new Error('An error occured')
            });
        },
        NewPost: (title, link, description, categories) => {
            return postServices.save(title, link, description, categories).then()
        }
    });

    return <PostContext.Provider value={state}>
        {children}
    </PostContext.Provider>
};