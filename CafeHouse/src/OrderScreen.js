import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fp, getStatusBarHeight, hp, wp } from "../utils/responsive";
import { useAtom } from "jotai";
import { billAtom } from "../utils/atoms";
import MenuItem from "./components/MenuItem";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../utils/requests";

const OrderScreen = () => {
  const [bill, setBill] = useAtom(billAtom);
  const [price, setPrice] = useState(0);

  const navigation = useNavigation();

  const calculatePrice = () => {
    let calculate = 0;
    bill.map((data) => {
      console.log(data.productprice);
      calculate += data.productprice;
    });
    console.log(calculate);
    setPrice(calculate);
  };

  useEffect(() => {
    calculatePrice();
  }, [bill]);

  const removeItemFromBill = (itemToRemove) => {
    setBill((prevBill) =>
      prevBill.filter((item) => item._id !== itemToRemove._id)
    );
  };

  const onPressCreateOrder = async () => {
    if (price < 1) {
      showMessage({
        type: "danger",
        message: "Sepete ürün eklenmelidir",
      });
      return;
    }
    console.log("tıklandı");
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    await axios
      .post(baseUrl + ":3000/addorder", {
        price: price,
        createdAt: formattedDate,
        updatedAt: formattedDate,
      })
      .then((response) => {
        console.log("başarılı");
        showMessage({
          message: "Sipariş Oluşturuldu",
          type: "success",
        });
        setBill([]);
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <MenuItem
        onPressDelete={() => {
          removeItemFromBill(item);
        }}
        orderState
        icon="😎"
        text={item.productname}
        price={item.productprice}
        onPressAddBill={() => {
          onPressAddBill({ item: item });
        }}
      ></MenuItem>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: hp(3) }}>
        <Text style={{ fontWeight: "bold", fontSize: fp(4) }}>Price</Text>
        <Text style={{ fontWeight: "bold", fontSize: fp(4) }}>{price}</Text>
      </View>
      <FlatList data={bill} renderItem={renderItem}></FlatList>
      <TouchableOpacity onPress={onPressCreateOrder} style={styles.orderButton}>
        <Text style={{ color: "white", fontSize: fp(2.1), fontWeight: "bold" }}>
          Siparişi oluştur
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight + hp(10),
  },
  orderButton: {
    width: wp(80),
    paddingVertical: hp(1.7),
    backgroundColor: "black",
    borderRadius: wp(3),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: hp(3),
  },
});
