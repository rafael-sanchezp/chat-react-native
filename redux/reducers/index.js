import { combineReducers } from "redux";
import session from "./session";
import loading from "./loading";

const reducers = combineReducers({
  loading,session
});

export default reducers;
