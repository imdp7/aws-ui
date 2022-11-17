import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Feature2Data {
  name: string;
  active: boolean;
  description?: string;
}

export const createFeature2Data = (
  name: string,
  active = false,
  description = ''
): Feature2Data => {
  return { name, description, active };
};

const initialState: Feature2Data[] = [
  {
    name: 'Item 1',
    active: true,
  },
  {
    name: 'Item 2',
    active: false,
  },
  {
    name: 'Item 3',
    active: true,
    description: 'Item Description 3',
  },
];

export const feature2DataSlice = createSlice({
  name: 'feature2Data',
  initialState,
  reducers: {
    addFeature2Data(
      state,
      action: PayloadAction<Feature2Data>
    ): Feature2Data[] {
      return [...state, action.payload];
    },
  },
});

export const { addFeature2Data } = feature2DataSlice.actions;

export const selectFeature2Data = (state: RootState) => state.feature2Data;

export default feature2DataSlice.reducer;
