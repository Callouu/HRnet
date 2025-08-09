import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from './employeeSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // Blacklist any state keys that should not be persisted
  blacklist: ['register']
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

// Redux store with persisted reducer
export const store = configureStore({
  reducer: {
    employees: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
