import {VK_INIT_APP_SUCCESS, INIT_TOKEN_ERROR, VK_INIT_APP_ERROR} from './actions';

const initialState = {};

const vkReducer = (state = initialState, {payload, type}) => {
    switch (type) {
        case VK_INIT_APP_SUCCESS:
            return state;
        case VK_INIT_APP_ERROR:
            console.log(VK_INIT_APP_ERROR, payload);
            return state;
        case INIT_TOKEN_ERROR:
            console.log(INIT_TOKEN_ERROR, payload);
            return state;
        default:
            return state;
    }
};

export default vkReducer;