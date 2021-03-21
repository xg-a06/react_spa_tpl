import React from 'react';
import { createStore as _createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import eventBus from '../utils/eventEmitter';

import rootReducer, { actions, effects } from './rootReducer';

const createStore = (NODE_ENV) => {
  const initialState = {};

  const enhancers = [];

  if (NODE_ENV === 'local') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(...enhancers);

  const store = _createStore(rootReducer, initialState, composedEnhancers);
  eventBus.emit('StoreCreated', store);

  return store;
};

const DataProvider = (props) => {
  const { children, store } = props;
  return <Provider store={store}>{children}</Provider>;
};

export { actions, effects, connect, createStore };

export default DataProvider;
