import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: JSON.parse(localStorage.getItem('search'))||[],
  reducers: {
    addSearch: (state, action) => {
      const newSearchHistory = [action.payload, ...state];
      if (newSearchHistory.length > 5) {
        newSearchHistory.pop();
      }
      localStorage.setItem('search',JSON.stringify(newSearchHistory));
      return newSearchHistory;
    },
  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;
