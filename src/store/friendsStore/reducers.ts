import { INIT_FRIENDS_SUCCESS, INIT_FRIENDS_ERROR } from './actions';

const initialState = {
    objects: {},
    friendsIds: [],
    offset: 0,
    allFriendsNumber: 0,
    hasMore: true,
    isLoading: true,
};

const friendsReducer = (state = initialState, {payload, type}) => {
    switch (type) {
        case INIT_FRIENDS_SUCCESS:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    ...payload.friends,
                },
                friendsIds: [...state.friendsIds, ...payload.ids],
                offset: state.offset + payload.ids.length,
                hasMore: (state.offset + payload.ids.length) < payload.count,
                allFriendsNumber: payload.count,
                isLoading: false
            };
        case INIT_FRIENDS_ERROR:
            console.log(INIT_FRIENDS_ERROR);
            return state;
        default:
            return state;
    }
};

export default friendsReducer;