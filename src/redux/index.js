import { combineReducers } from "redux";
import auth from "./reducer/reducer";

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
