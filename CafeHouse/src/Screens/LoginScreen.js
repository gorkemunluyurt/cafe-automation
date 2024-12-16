import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { fp, hp, wp } from "../../utils/responsive";
import Ionicons from "@expo/vector-icons/Ionicons";
import { baseUrl, login } from "../../utils/requests";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../../utils/atoms";
const LoginScreen = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [email, setEmail] = useState("ornek1@email.com");
  const [password, setPassword] = useState("sifre123");

  const [user, setUser] = useAtom(userAtom);

  const navigation = useNavigation();

  const onPressLogin = async () => {
    console.log(baseUrl + ":3000/userlogin");
    await axios
      .post(baseUrl + ":3000/userlogin", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setUser(response.data);
          navigation.navigate("BottomNavigation");
        }
      })
      .catch((e) => {
        console.log("hata: " + e);
        return false;
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hi, Welcome Back! 👋</Text>
      <Text style={styles.subText}>Hello again, you've been missed!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.textInputTitle}>Email Address</Text>
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
        onPress={onPressLogin}
        style={styles.button}
        activeOpacity={0.9}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: wp(90),
          alignItems: "center",
          marginBottom: hp(4),
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          width: wp(90),
          justifyContent: "space-around",
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: hp(4),
        }}
      >
        <Text style={{ color: "#999999" }}>Don't have an account?</Text>
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: hp(15),
    paddingLeft: wp(5),
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
