import React, { useEffect } from "react";
import {
  Button,
  Text,
  Divider,
  Layout,
  TopNavigation,
} from "@ui-kitten/components";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { gql, useQuery } from "@apollo/client";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import AppLoading from "expo-app-loading";
import { useStoreActions, useStoreState } from "../store/hooks";
import { Card, List, ListItem } from "@ui-kitten/components";
import { Vendor } from "../store";
import Constants from "expo-constants";

const GET_VENDORS = gql`
  query {
    vendors {
      name
      id
    }
  }
`;

export function HomeScreen({ navigation }: any) {
  const { data, loading, error } = useQuery<{ vendors: Vendor[] }>(GET_VENDORS);
  const setVendors = useStoreActions((action) => action.setVendors);
  const vendors = useStoreState((state) => state.vendors);

  console.log("data", vendors);
  console.log("error", error);

  useEffect(() => {
    setVendors(data?.vendors ?? []);
  }, [data]);

  const onVendorPress = (vendor: Vendor) => () => {
    navigation.navigate("Vendor", { vendor });
  };

  const renderItem = ({ item }: { item: Vendor }) => {
    console.log("item", { item });
    return (
      <Card onPress={onVendorPress(item)}>
        <Text>{item.name}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <TopNavigation title="LUNCHVERSITY" alignment="center" />
        <FlatList
          data={vendors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
