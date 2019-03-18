import { createStore, applyMiddleware, Middleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';

const configureStore = () => {
  let middlewares: Array<Middleware> = [];

  if (__DEV__) {
    middlewares = [
      ...middlewares,
      createLogger()
    ];
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
