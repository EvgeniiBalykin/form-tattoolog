import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { candidateReducer } from "./candidateReducer";

const rootReducer = combineReducers({
  candidateReducer
})
export const store = configureStore({
  reducer: rootReducer
});

// export const store = configureStore({
//   reducer: candidateReducer,
// })