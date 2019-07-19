import {
    INIT_USER_SUCCESS,
} from './actions';

const initialStore = {
    id: null,
    name: '',
    surname: '',
    avatar: null,
    isLoading: true,
};

const userReducer = (state = initialStore, { type, payload }) =>  {
    switch (type) {
        case INIT_USER_SUCCESS:
            return {
                ...state,
                ...payload,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default userReducer;