import { combineReducers } from "redux";
import session from "./session";
import loading from "./loading";
import users from "./users";
import messages from "./messages";
const reducers = combineReducers({
  loading,session,users,messages
});

export default reducers;
