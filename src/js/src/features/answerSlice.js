import { createSlice } from '@reduxjs/toolkit';

export const answerSlice = createSlice({
  name: 'answer',
  initialState: {
    answer: null,
  },
  reducers: {
    setanswer:( state,action )=> {
      state.answer=action.payload;
      }
    
  

  },
});

export const { setanswer } = answerSlice.actions;

export const selectanswer = state => state.answer.answer;


export default answerSlice.reducer;
