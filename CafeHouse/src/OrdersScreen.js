import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { fp, getStatusBarHeight, hp, wp } from "../utils/responsive";
import { atom, useAtom } from "jotai";
import { ordersAtom } from "../utils/atoms";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { baseUrl } from "../utils/requests";

const OrdersScreen = () => {
  const [orders, setOrders] = useAtom(ordersAtom);
  const orderItem = ({ price, createdAt }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: hp(2),
          borderRadius: wp(5),
          justifyContent: "space-between",
          marginHorizontal: wp(2),
          elevation: 5,
          backgroundColor: "white",
          width: wp(90),
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: fp(2) }}>{price}TL</Text>
        <Text style={{ fontSize: fp(2), color: "#cccccc", marginLeft: wp(3) }}>
          {createdAt}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ alignSelf: "center", paddingVertical: hp(1.5) }}>
        {orderItem({ price: item.price, createdAt: item.createdat })}
      </View>
    );
  };

  const getAllOrders = async () => {
    await axios
      .get(baseUrl + ":3000/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((e) => {
        console.log("hata: " + e);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={orders} renderItem={renderItem}></FlatList>
      <TouchableOpacity
        onPress={getAllOrders}
        activeOpacity={0.9}
        style={{
          position: "absolute",
          top: getStatusBarHeight + hp(2),
          right: wp(5),
        }}
      >
        <Ionicons size={wp(7)} color={"#00288D"} name="refresh"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight + hp(10),
  },
});
