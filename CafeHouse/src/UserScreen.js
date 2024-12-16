import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { getStatusBarHeight, hp, wp, fp } from "../utils/responsive";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "../utils/atoms";
import axios from "axios";
import { baseUrl } from "../utils/requests";
import { showMessage } from "react-native-flash-message";

const UserScreen = () => {
  const [user, setUser] = useAtom(userAtom);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [email, setEmail] = useState(user[0].email);
  const [password, setPassword] = useState(user[0].password);
  const [name, setName] = useState(user[0].firstname);
  const [lastName, setLastName] = useState(user[0].lastname);

  const onPressLogin = async () => {
    console.log(baseUrl + ":3000/userlogin");
    await axios
      .post(baseUrl + ":3000/userlogin", {
        email: user[0].email,
        password: user[0].password,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data);
        }
      })
      .catch((e) => {
        console.log("hata: " + e);
        return false;
      });
  };

  const updateUser = async () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    await axios
      .post(baseUrl + ":3000/updateuser", {
        email: email,
        firstName: name,
        lastName: lastName,
        password: password,
        createdAt: user[0].createdat,
        updatedAt: formattedDate,
        userid: user[0].id,
      })
      .then((response) => {
        onPressLogin();
        console.log("başarılı");
        showMessage({
          message: "Bilgilerin Başarıyla Güncellendi",
          type: "success",
        });

        navigation.navigate("LoginScreen");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Merhaba, {user[0].firstname}</Text>
      <Text style={styles.subText}>
        Bilgilerini buradan güncelleyebilirsin!
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.textInputTitle}>First Name</Text>
        <View style={styles.textInput}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          ></TextInput>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textInputTitle}>Last Name</Text>
        <View style={styles.textInput}>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          ></TextInput>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textInputTitle}>Email</Text>
        <View style={styles.textInput}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          ></TextInput>
        </View>
      </View>

      <View style={{ marginBottom: hp(3) }}>
        <Text style={styles.textInputTitle}>Password</Text>
        <View style={[styles.textInput, { flexDirection: "row" }]}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hiddenPassword}
            style={{ width: wp(80) }}
            placeholder="Enter your password"
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setHiddenPassword(!hiddenPassword);
            }}
            style={{
              alignItems: "flex-end",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {!hiddenPassword && <Ionicons name="eye" size={wp(5)}></Ionicons>}
            {hiddenPassword && (
              <Ionicons name="eye-off" size={wp(5)}></Ionicons>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={updateUser}
        style={styles.button}
        activeOpacity={0.9}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>
          Bilgilerimi Güncelle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight + hp(10),
    alignItems: "center",
  },
  titleText: {
    fontSize: fp(3),
    fontWeight: "500",
    marginBottom: hp(1),
  },
  subText: {
    color: "#999999",
    fontSize: fp(1.9),
    marginBottom: hp(5),
  },
  textInputTitle: {
    marginBottom: hp(0.5),
  },
  textInput: {
    width: wp(90),
    padding: hp(1),
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: wp(2),
  },
  inputContainer: {
    marginBottom: hp(4),
  },
  button: {
    paddingVertical: hp(1.5),
    backgroundColor: "#703eff",
    borderRadius: wp(2),
    justifyContent: "center",
    alignItems: "center",
    width: wp(90),
    marginBottom: hp(4),
  },
});
