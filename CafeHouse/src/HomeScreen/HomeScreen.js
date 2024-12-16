import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { billAtom, menuAtom, userAtom } from "../../utils/atoms";
import axios from "axios";
import { getStatusBarHeight, hp, wp } from "../../utils/responsive";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuItem from "../components/MenuItem";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { baseUrl } from "../../utils/requests";

const HomeScreen = () => {
  const [menu, setMenu] = useAtom(menuAtom);
  const [bill, setBill] = useAtom(billAtom);
  const user = useAtomValue(userAtom);

  const navigation = useNavigation();

  const getMenu = async () => {
    await axios
      .get(baseUrl + ":3000/menu")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((e) => {
        console.log("hata: " + e);
      });
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {}, [menu]);

  const deleteMenu = async ({ item }) => {
    const date = new Date();

    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    await axios
      .post(baseUrl + ":3000/deletemenu", {
        productid: item.productid,
      })
      .then((response) => {
        console.log("başarılı");
        showMessage({
          message: "Menüden Silindi",
          type: "success",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <MenuItem
        icon="😎"
        text={item.productname}
        price={item.productprice}
        onPressDelete={() => {
          deleteMenu({ item: item });
        }}
        onPressAddBill={() => {
          onPressAddBill({ item: item });
        }}
        onPressUpdate={() => {
          navigation.navigate("UpdateScreen", { item: item });
        }}
        acceslevel={user[0].userlevel}
      ></MenuItem>
    );
  };

  const onPressAddBill = ({ item }) => {
    console.log(bill);
    let data = [];
    data = bill;
    data.push({ ...item, _id: Math.round(Math.random() * 1000000) });

    setBill(data);
    showMessage({
      type: "success",
      message: "Sepete Eklendi",
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OrderScreen");
        }}
        style={styles.shoppingBag}
      >
        <Entypo
          style={styles.updateIconStyle}
          size={wp(6)}
          name="shopping-bag"
          color={bill.length < 1 ? "green" : "red"}
        />
      </TouchableOpacity>
      {menu.length > 0 && (
        <FlatList data={menu} renderItem={renderItem}></FlatList>
      )}
      {user[0].userlevel === "admin" && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductScreen");
          }}
          activeOpacity={0.9}
          style={styles.addButton}
        >
          <Ionicons name="add" size={wp(9)} color={"white"}></Ionicons>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={getMenu}
        activeOpacity={0.9}
        style={{
          position: "absolute",
          top: getStatusBarHeight + hp(2),
          left: wp(5),
        }}
      >
        <Ionicons size={wp(7)} color={"#00288D"} name="refresh"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight + hp(10),
  },
  addButton: {
    backgroundColor: "#00288D",
    width: wp(13),
    height: wp(13),
    borderRadius: wp(13),
    position: "absolute",
    bottom: hp(2),
    right: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  shoppingBag: {
    position: "absolute",
    top: getStatusBarHeight + hp(2),
    right: wp(8),
  },
});
