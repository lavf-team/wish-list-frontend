import { INIT_FRIENDS_IDS_SUCCESS } from './actions';

const initialState = [];

const friendsIdsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case INIT_FRIENDS_IDS_SUCCESS:
            return [...payload];
        default:
            return state;
    }
};

export default friendsIdsReducer;