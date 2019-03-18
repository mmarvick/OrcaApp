import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './app';

// Configure redux store
const store = configureStore();

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithRedux;
