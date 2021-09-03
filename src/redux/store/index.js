import * as reduxModule from "redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const logger = (store) => (next) => (action) => {
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancer = composeEnhancers(applyMiddleware(logger, thunk));

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);
export { persistor, store };
