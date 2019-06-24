const initialState = {
    list: [],
};

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_POSTS_RECEIVED": {
            return {
                ...state,
                list: action.payload.list,
                fetched: true
            };
        }
        case 'FETCH_POSTS_UNAUTHORIZED':
            return {
                ...state,
                list: [],
                fetched: action.payload.fetched,
            };
        default:
            return state;
    }
};