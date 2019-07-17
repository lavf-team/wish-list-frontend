import {
    INIT_USER_SUCCESS,
    INIT_USER_ERROR,
    } from './actions';

const initialStore = {
    id: null,
    name: '',
    surname: '',
    avatar: null
};

const userReducer = (state = initialStore, { type, payload }) =>  {
    switch (type) {
        case INIT_USER_SUCCESS:
            return {
                ...payload
            };
        default:
            return state;
    }
};

export default userReducer;