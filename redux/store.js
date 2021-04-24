import { Platform } from "react-native";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-community/async-storage";

import storage from "redux-persist/es/storage";

import combinedReducer from "./reducers";
import persistReducer from "redux-persist/es/persistReducer";

const ios = Platform.OS == "ios";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // stateReconciler: autoMergeLevel2,
  //   blacklist: ["queue", "media"],
};
const pReducer = persistReducer(persistConfig, combinedReducer);

const middleware = applyMiddleware(thunk);
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

// if (__DEV__) middleware = [thunk, userTiming]
// if (__DEV__ && Platform.OS == 'android') middleware = [thunk, loggerMiddleware,  ]

export default createStore(pReducer, composeEnhancers(middleware));
//const configureStore = composeEnhancers(applyMiddleware(...middleware))(createStore);

//const createAppStore = () => {
//	let store = configureStore(combinedReducer);
//	let persistor = persistStore(store, () => store.getState());
//	// if (__DEV__) persistor.purge()
//	return { persistor, store };
//};
//export default createAppStore;
