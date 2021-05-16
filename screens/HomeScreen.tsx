import React, { useEffect } from "react";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import AppLoading from "expo-app-loading";

export function HomeScreen({ navigation }: any) {
  const { data, loading } = useQuery(gql`
    query Vendors {
      vendors {
        name
        id
      }
    }
  `);

  useEffect(() => {
    console.log("data", { data });
  }, [data]);

  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {loading ? (
          <AppLoading />
        ) : (
          <Button onPress={navigateDetails}>OPEN DETAILS</Button>
        )}
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
