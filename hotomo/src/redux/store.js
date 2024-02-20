import {configureStore} from '@reduxjs/toolkit';
import mainReducer from './middleware';

// const logger = require('redux-logger').createLogger();

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  //   middleware: middle => middle().concat(logger),
});

export default store;
