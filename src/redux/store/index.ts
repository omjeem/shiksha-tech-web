import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import classReducer from './class/classSlice';


const appReducer = combineReducers({
  class : classReducer
});

// Create the Redux store
export const store = configureStore({
  reducer: appReducer,
});

// Export types for type annotations
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
