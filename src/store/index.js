import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import user from './userStore/reducers';
import friends from './friendsStore/reducers';
import vk from './vkStore/reducers';
import friendsIds from './friendsIdsStore/reducers';

const reducers = combineReducers({
    user,
    friends,
    vk,
    friendsIds,
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;