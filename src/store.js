import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import usersReducer from "./redux/reducers/usersReducer";
import commonReducer from "./redux/reducers/commonReducer";

export default createStore(
  combineReducers({
    users: usersReducer,
    common: commonReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
