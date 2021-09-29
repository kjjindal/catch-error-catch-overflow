import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/languageSlice';
import userReducer from '../features/userSilice';
import answerReducer from '../features/answerSlice';




export default configureStore({
  reducer: {
    language: languageReducer,
    user:userReducer,
    answer:answerReducer
  }
});
