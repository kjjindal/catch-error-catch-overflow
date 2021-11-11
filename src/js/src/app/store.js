import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/languageSlice';
import userReducer from '../features/userSilice';
import answerReducer from '../features/answerSlice';
import filterReducer from '../features/filterSlice';
import searchReducer from '../features/searchSlice';






export default configureStore({
  reducer: {
    language: languageReducer,
    user:userReducer,
    answer:answerReducer,
    search:searchReducer,
    filter:filterReducer
  }
});
