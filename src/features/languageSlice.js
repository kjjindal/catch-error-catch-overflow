import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: null,
  },
  reducers: {
    setlanguage:( state,action )=> {
      state.language=action.payload;
      }
    
  

  },
});

export const { setlanguage } = languageSlice.actions;

export const selectlanguage = state => state.language.language;


export default languageSlice.reducer;
