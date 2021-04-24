import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashLoading from "./components/SplashLoading";

//import { PersistGate } from "redux-persist/es/integration/react";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

//import JournalReducer from "./redux/reducers";
import { Provider } from "react-redux";
//import createAppStore from "./redux/store";
import store from "./redux/store";

//const { persistor, store: ReduxStore } = createAppStore();
//const { persistor, store: ReduxStore } = createAppStore();
//const store = createStore(JournalReducer);
//
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

export const persistor = persistStore(store);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashLoading />} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
