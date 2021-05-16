import React from "react";
import { View, SafeAreaView } from "react-native";
import {
  Text,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import { Vendor } from "../store";
import { gql, useQuery } from "@apollo/client";
import { Barcode } from "../components/Barcode";

const GET_POINTS = gql`
  query Points($userId: Int!, $vendorId: Int!) {
    points(userId: $userId, vendorId: $vendorId) {
      amount
    }
  }
`;

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const VendorScreen = ({ route, navigation }: any) => {
  const { vendor } = route.params as { vendor: Vendor };
  const { data, loading, error } = useQuery<{ points: { amount: number } }>(
    GET_POINTS,
    {
      variables: { userId: 1, vendorId: vendor.id },
    }
  );

  const renderBackAction = (goBack: () => void) => () => {
    return <TopNavigationAction icon={BackIcon} onPress={goBack} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <TopNavigation
          alignment="center"
          title={vendor.name}
          accessoryLeft={renderBackAction(() => navigation.goBack())}
        />
        <Text>{vendor.name}</Text>
        <Text>Points: {data?.points.amount ?? "No points yet!"}</Text>
        <Barcode />
      </Layout>
    </SafeAreaView>
  );
};
