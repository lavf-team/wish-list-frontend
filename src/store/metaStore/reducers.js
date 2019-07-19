import { INIT_TOKEN_SUCCESS } from './actions';

const initialState = {
    isLoading: true,
};

const metaReducer = (state = initialState, {payload, type}) => {
    switch (type) {
        case INIT_TOKEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default metaReducer;