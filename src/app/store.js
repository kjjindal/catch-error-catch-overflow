import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/languageSlice';
import userReducer from '../features/userSilice';
import answerReducer from '../features/answerSlice';
import searchReducer from '../features/searchSlice';





export default configureStore({
  reducer: {
    language: languageReducer,
    user:userReducer,
    answer:answerReducer,
    search:searchReducer
  }
});
