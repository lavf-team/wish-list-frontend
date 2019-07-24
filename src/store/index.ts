import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import friends from './friendsStore/reducers';
import gifts from './giftsStore/reducers';
import meta from './metaStore/reducers';
import user from './userStore/reducers';
import wishes from './wishesStore/reducers';

const reducers = combineReducers({
  user,
  friends,
  meta,
  wishes,
  gifts,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
