import { combineReducers } from "redux";
import session from "./session";
import loading from "./loading";
import users from "./users";

const reducers = combineReducers({
  loading,session,users
});

export default reducers;
