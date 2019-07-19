import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import user from './userStore/reducers';
import friends from './friendsStore/reducers';
import meta from './metaStore/reducers';

const reducers = combineReducers({
    user,
    friends,
    meta,
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;