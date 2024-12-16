import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PersonItem from "./components/PersonItem";
import { getStatusBarHeight, hp, wp } from "../utils/responsive";
import axios from "axios";
import { baseUrl } from "../utils/requests";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import { userAtom } from "../utils/atoms";
import UserLevelModal from "./UserLevelModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";

const PersonsScreen = () => {
  const [users, setUsers] = useState([]);
  const [modalState, setModalState] = useState(false);
  const navigation = useNavigation();

  const [selectedUser, setSelectedUser] = useState({});

  const user = useAtomValue(userAtom);
  const getAllUsers = async () => {
    await axios
      .get(baseUrl + ":3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log("hata: " + e);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PersonItem
        onPress={() => {
          if (user[0].userlevel === "admin") {
            setModalState(true);
          } else {
            showMessage({
              type: "danger",
              message: "Yetki seviyeniz yeterli değil!",
            });
          }
          setSelectedUser(item);
        }}
        name={item.firstname + " " + item.lastname}
        lastActivity={item.createdat}
        location={item.userlevel}
      ></PersonItem>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={users} renderItem={renderItem}></FlatList>
      {user[0].userlevel === "admin" && (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: hp(4),
            position: "absolute",
            top: getStatusBarHeight + hp(2),
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "#999999" }}>Add New Worker?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
            activeOpacity={0.9}
            style={{ marginLeft: wp(1) }}
          >
            <Text style={{ color: "#703eff", fontWeight: "500" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      <UserLevelModal
        isModalActive={modalState}
        selectedUser={selectedUser}
        closeModal={() => {
          setModalState(false);
        }}
      ></UserLevelModal>
      <TouchableOpacity
        onPress={getAllUsers}
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

export default PersonsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight + hp(10),
  },
});
