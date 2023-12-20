import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./slices/user";
import countryReducer from "./slices/country"; // Import the country reducer
import institutionReducer from "./slices/institution"; // Import the institution reducer
import studentReducer from "./slices/student";
import classroomReducer from "./slices/classroom";
import { ClassroomState } from "../types/classroom";


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const userPersistConfig = {
  key: "user",
  storage,
  keyPrefix: "redux-",
  whitelist: ["users", "selectedUser"],
};

const countryPersistConfig = {
  key: "country",
  storage,
  keyPrefix: "redux-",
  whitelist: ["countries"], // Add the fields you want to persist in the country slice
};

const institutionPersistConfig = {
  key: "institution",
  storage,
  keyPrefix: "redux-",
  whitelist: ["institutions"], // Add the fields you want to persist in the institution slice
};

const studentPersistConfig = {
  key: "institution",
  storage,
  keyPrefix: "redux-",
  whitelist: ["students"], // Add the fields you want to persist in the student slice
};



const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  country: persistReducer(countryPersistConfig, countryReducer), // Add the country reducer
  institution: persistReducer(institutionPersistConfig, institutionReducer), // Add the institution reducer
  student: persistReducer(studentPersistConfig, studentReducer), // Add the student reducer
  classroom: classroomReducer,
});

export type RootState = {
  classroom: ClassroomState;
  // Add other state slices as needed
};


export { rootPersistConfig, rootReducer };
