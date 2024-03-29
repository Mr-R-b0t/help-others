import {user} from './actions.js';

const initialState = {
    user: null,
};  

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case user:
        return {
            ...state,
            user: action.payload,
        };
        default:
        return state;
    }
    };

export default reducer;

