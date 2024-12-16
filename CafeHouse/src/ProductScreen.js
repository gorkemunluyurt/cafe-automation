import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { fp, getStatusBarHeight, hp, wp } from "../utils/responsive";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../utils/requests";

const ProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const navigation = useNavigation();

  const addMenu = async () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    await axios
      .post(baseUrl + ":3000/addmenu", {
        productprice: parseFloat(price),
        productname: productName,
        createdAt: formattedDate,
        updatedAt: formattedDate,
      })
      .then((response) => {
        console.log("başarılı");
        showMessage({
          message: "Menüye Eklendi",
          type: "success",
        });

        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#00288D",
          paddingVertical: hp(8),
          paddingHorizontal: wp(2),
          borderRadius: wp(3),
        }}
      >
        <TextInput
          maxLength={25}
          value={productName}
          onChangeText={setProductName}
          placeholder="Ürün İsmi"
          style={styles.textInput}
        ></TextInput>
        <TextInput
          maxLength={25}
          value={price}
          onChangeText={setPrice}
          placeholder="Fiyatı"
          style={styles.textInput}
          keyboardType="numeric"
        ></TextInput>
        <TouchableOpacity
          onPress={addMenu}
          style={{
            backgroundColor: "white",
            width: wp(80),
            paddingVertical: hp(1.5),
            borderRadius: wp(4),
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: fp(2.1) }}>
            Ürün Ekle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight + hp(10),
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: wp(95),
    paddingVertical: hp(1),
    borderRadius: wp(4),
    paddingHorizontal: wp(2),
    marginBottom: hp(2),
    elevation: 2,
    backgroundColor: "white",
  },
});
