import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import user from './userStore/reducers';
import friends from './friendsStore/reducers';
import meta from './metaStore/reducers';
import wishes from './wishesStore/reducers';
import gifts from './giftsStore/reducers';

const reducers = combineReducers({
    user,
    friends,
    meta,
    wishes,
    gifts,
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;