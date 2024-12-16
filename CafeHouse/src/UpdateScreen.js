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
import { useNavigation, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { baseUrl } from "../utils/requests";

const UpdateScreen = () => {
  const {
    params: { item },
  } = useRoute();
  const [productName, setProductName] = useState(item.productname + "");
  const [price, setPrice] = useState("" + item.productprice);

  const navigation = useNavigation();

  const addMenu = async () => {
    const date = new Date();

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    await axios
      .post(baseUrl + ":3000/updatemenu", {
        productprice: parseFloat(price),
        productname: productName,
        createdAt: formattedDate,
        updatedAt: formattedDate,
        productid: item.productid,
      })
      .then((response) => {
        console.log("başarılı");
        showMessage({
          message: "Menü Güncellendi",
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
            Ürünü Güncelle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateScreen;

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
