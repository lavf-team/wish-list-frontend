import { INIT_FRIENDS_SUCCESS, INIT_FRIENDS_ERROR } from './actions';

const initialState = {};

const friendsReducer = (state = initialState, {payload, type}) => {
    switch (type) {
        case INIT_FRIENDS_SUCCESS:
            return {
                ...state,
                ...payload,
            };
        case INIT_FRIENDS_ERROR:
            console.log(INIT_FRIENDS_ERROR);
            return state;
        default:
            return state;
    }
};

export default friendsReducer;