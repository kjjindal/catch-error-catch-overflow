import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: null,
    showsearchbox:false,
  },
  reducers: {
    setsearch:( state,action )=> {
      state.search=action.payload;
      },
      setnotshowsearchbox:(state)=>{
          state.showsearchbox=false;
      },
      setshowsearchbox:(state)=>{
        state.showsearchbox=true;
    }
    
  

  },
});

export const { setsearch,setshowsearchbox,setnotshowsearchbox } = searchSlice.actions;

export const selectsearch = state => state.search.search;
export const selectshowsearchbox= state => state.search.showsearchbox;




export default searchSlice.reducer;
