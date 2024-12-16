import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import IonicIcons from "@expo/vector-icons/Ionicons";
import { hp, wp, fp } from "../../utils/responsive";
import Entypo from "@expo/vector-icons/Entypo";

const MenuItem = ({
  icon = "",
  text = "",
  createdAt = "",
  price = "100tl",
  onPressDelete = () => {},
  onPressUpdate = () => {},
  onPressAddBill = () => {},
  orderState = false,
  acceslevel = "worker",
}) => {
  const onPress = () => {};
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: wp(10), height: wp(10), borderRadius: wp(10) }}
          source={require("../../icon.jpg")}
        ></Image>
        <View>
          <Text style={styles.text}>
            {text} <Text style={{ fontWeight: "bold" }}>{price}TL</Text>
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        {!orderState && (
          <Entypo
            style={styles.updateIconStyle}
            onPress={onPressAddBill}
            size={wp(6)}
            name="shopping-bag"
            color={"green"}
          />
        )}
        {!orderState && acceslevel === "admin" && (
          <IonicIcons
            style={styles.updateIconStyle}
            onPress={onPressUpdate}
            size={wp(7)}
            name="repeat"
            color={"green"}
          ></IonicIcons>
        )}
        {(acceslevel === "admin" || orderState) && (
          <IonicIcons
            onPress={onPressDelete}
            size={wp(6)}
            name="trash-outline"
            color={"red"}
          ></IonicIcons>
        )}
      </View>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp(2),
    borderRadius: wp(5),
    justifyContent: "space-between",
    marginBottom: hp(2),
    marginHorizontal: wp(2),
    elevation: 5,
    backgroundColor: "white",
  },
  iconText: {
    fontSize: fp(3),
  },
  text: {
    marginLeft: wp(2),
  },
  createdAtText: {
    color: "#cccccc",
    fontSize: fp(1.6),
    marginLeft: wp(2),
  },
  updateIconStyle: {
    marginRight: wp(2),
  },
});
