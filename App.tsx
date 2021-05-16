import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApplicationProvider } from "@ui-kitten/components";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "172.20.1.128:8:8080/graphql",
  cache,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <AppLoading />;
  }

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <ApplicationProvider {...eva} theme={eva.light}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </ApplicationProvider>
        </StoreProvider>
      </ApolloProvider>
    );
  }
}
