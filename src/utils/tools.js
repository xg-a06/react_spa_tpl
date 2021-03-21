/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import { shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

const emptyObject = {};

const emptyArray = [];

const isPromise = (value) => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const pipeline = (val, ...funcs) => funcs.reduce((pre, cur) => cur(pre), val);

const toFixedEx = (num, dec) => {
  const tmp = 10 ** dec;
  return Math.round(num * tmp) / tmp;
};

const loop = () => ({});

const getType = (val) => Object.prototype.toString.call(val);

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const isArray = (arr) => Object.prototype.toString.call(arr) === '[object Array]';

const deepEqual = (cached, current) => {
  if (cached === current) {
    return true;
  }
  if (getType(cached) !== getType(current)) {
    return false;
  }
  if (typeof current !== 'object' && cached !== current) {
    return false;
  }
  if (isObject(current) && Object.keys(current).length !== Object.keys(cached).length) {
    return false;
  }
  if (isArray(current) && current.length !== cached.length) {
    return false;
  }
  if (cached === current) {
    return true;
  }
  for (const p in current) {
    if (current.hasOwnProperty(p)) {
      const result = deepEqual(cached[p], current[p]);
      if (!result) {
        return result;
      }
    }
  }
  return true;
};

const cachedResult = (fn) => {
  let cached = null;
  return (...args) => {
    const current = fn(...args);
    if (deepEqual(cached, current)) {
      return cached;
    }
    cached = current;
    return current;
  };
};

const cachedResultByKey = (fn, fnKey) => {
  const cachedObj = {};
  return (...args) => {
    const key = fnKey(...args);
    const cached = cachedObj[key];
    const current = fn(...args);
    if (deepEqual(cached, current)) {
      return cached;
    }
    cachedObj[key] = current;
    return current;
  };
};

const getProp = (obj, keys, sec = '.', defaultValue) =>
  keys.split(sec).reduce((o, key) => (o || {})[key] || defaultValue, obj);

const useSelector = (...fns) => {
  const selectorMethod = createSelector(...fns);
  let _args = null;
  let _cached = null;
  return (args) => {
    if (_cached && shallowEqual(_args, args)) {
      return _cached;
    }
    _args = args;
    _cached = selectorMethod(args);
    return _cached;
  };
};

const useCachedSelector = (...fns) => (cacheFn) => {
  const selectorMethod = createCachedSelector(...fns)(cacheFn);
  let _args = null;
  let _cached = null;
  return (args) => {
    if (_cached && shallowEqual(_args, args)) {
      return _cached;
    }
    _args = args;
    _cached = selectorMethod(args);
    return _cached;
  };
};

export {
  isPromise,
  emptyObject,
  emptyArray,
  isEmptyObject,
  pipeline,
  toFixedEx,
  loop,
  cachedResult,
  cachedResultByKey,
  createSelector,
  createCachedSelector,
  useSelector,
  useCachedSelector,
  getProp,
};
