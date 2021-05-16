import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const IP = "172.27.176.158";
const cache = new InMemoryCache();
const link = new HttpLink({ uri: `http://${IP}:8080/graphql` });
const client = new ApolloClient({
  link,
  cache,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loadingCache, setLoadingCache] = useState(true);

  console.log("link", { link });

  // useEffect(() => {
  //   persistCache({
  //     cache,
  //     storage: AsyncStorage,
  //   }).then(() => setLoadingCache(false));
  // }, []);

  // if (loadingCache) {
  //   return <AppLoading />;
  // }

  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <IconRegistry icons={EvaIconsPack} />
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
