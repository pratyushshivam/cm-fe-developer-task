import { createStore, applyMiddleware } from "redux";
import rootReducer from "../index";
import thunk from "redux-thunk";

const LOCAL_STORAGE_NAME = "localData";

class PersistedStore {
  static DefaultStore = null;
  static getDefaultStore() {
    if (PersistedStore.DefaultStore === null) {
      PersistedStore.DefaultStore = new PersistedStore();
    }
    return PersistedStore.DefaultStore;
  }
  _store = null;

  constructor() {
    this.initStore();
  }

  initStore() {
    this._store = createStore(
      rootReducer,
      PersistedStore.loadState(),
      applyMiddleware(thunk)
    );
    this._store.subscribe(() => {
      PersistedStore.saveState(this._store.getState());
    });
  }
  get store() {
    return this._store;
  }
  static loadState() {
    try {
      let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);

      if (serializedState === null) {
        return PersistedStore.initialState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return PersistedStore.initialState();
    }
  }
  static saveState(state) {
    console.log(state);
    try {
      let serializedState = JSON.stringify({ user: state.user });
      localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
    } catch (err) {
      console.log(err);
    }
  }

  static initialState() {
    return {};
  }
}

export default PersistedStore;
