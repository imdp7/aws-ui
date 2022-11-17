import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import feature2DataReducer from '../features/feature2/feature2DataSlice';

export const store = configureStore({
  reducer: {
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
