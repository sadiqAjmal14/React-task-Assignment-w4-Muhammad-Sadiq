import { createSlice } from '@reduxjs/toolkit';

const unitsSlice = createSlice({
    name: 'units',
    initialState: 'metric',
    reducers: {  // Corrected from 'reducer' to 'reducers'
        toggleUnitType: (state, action) => {
            return state === 'metric' ? 'imperial' : 'metric';
        }
    }
});

export const { toggleUnitType } = unitsSlice.actions; // Added .actions
export default unitsSlice.reducer;
