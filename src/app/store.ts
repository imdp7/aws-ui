import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import feature2DataReducer from '../features/S3/feature2DataSlice';
// import themes from './theme'
// import regions './region'

export const store = configureStore({
  reducer: {
    // preferences: preferences,
    feature2Data: feature2DataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
