import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import { autoRehydrate, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import reducers from './Reducers';


const middleware = applyMiddleware(createSagaMiddleware(), logger());


const store = createStore(reducers, compose(
    middleware, autoRehydrate()
  ));

persistStore(store, {storage: AsyncStorage});

export default store;
