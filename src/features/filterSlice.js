import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: null,
  },
  reducers: {
    setfilter:( state,action )=> {
      state.filter=action.payload;
      }
    
  

  },
});

export const { setfilter } = filterSlice.actions;

export const selectfilter = state => state.filter.filter;


export default filterSlice.reducer;
