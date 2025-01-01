import {configureStore} from '@reduxjs/toolkit';
import userList from './reducers/userList';

export const store = configureStore({
  reducer: {
    userList
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;