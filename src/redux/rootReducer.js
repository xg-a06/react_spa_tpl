import { combineReducers } from 'redux';
import produce from 'immer';
import { pipeline } from '../utils/tools';
import eventBus from '../utils/eventEmitter';
import app from './modules/app';
import auth from './modules/auth';

const actions = {};
const effects = {};
const rootRef = { actions, effects };

eventBus.on('StoreCreated', (store) => {
  window.rootRef = rootRef;
  rootRef.dispatch = store.dispatch;
  rootRef.getState = store.getState;
});

const models = {
  app,
  auth,
};

const collectionAndConvert = (rootRefParam, model) => {
  const { key, state: initState, reducers: initReducers, effects: initEffects = {} } = model;

  const { modelReducers, modelActions } = Object.entries(initReducers).reduce(
    (ret, [name, fn]) => {
      const actionType = `${key.toLocaleUpperCase()}/${name.toLocaleUpperCase()}`;
      ret.modelReducers[actionType] = fn;
      ret.modelActions[name] = (payload) => {
        rootRefParam.dispatch({ type: actionType, payload });
      };
      return ret;
    },
    { modelReducers: {}, modelActions: {} }
  );

  const modelEffects = Object.entries(initEffects).reduce((ret, [name, fn]) => {
    ret[name] = (payload) =>
      fn.bind({
        $root: rootRef,
        ...modelActions,
      })(payload);
    return ret;
  }, {});

  const modelReducer = (state = initState, action) => {
    const { type, payload } = action;
    if (modelReducers[type]) {
      return produce(state, (draft) => modelReducers[type](draft, payload));
    }
    return state;
  };

  return {
    modelActions,
    modelEffects,
    modelReducer,
  };
};

const reducersCreator = (modelParams) => {
  const reducers = Object.values(modelParams).reduce((result, model) => {
    const { key } = model;

    const { modelActions, modelEffects, modelReducer } = collectionAndConvert(rootRef, model);

    actions[key] = modelActions;
    effects[key] = modelEffects;
    result[key] = modelReducer;

    return result;
  }, {});

  return reducers;
};

export { actions, effects };

export default pipeline(models, reducersCreator, combineReducers);
