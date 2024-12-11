import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import enrollmentreducer from "./enrollmentreducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    accountReducer,
    enrollmentreducer
  },
});
export default store;