import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fp, getStatusBarHeight, hp, wp } from "../utils/responsive";
import axios from "axios";
import { baseUrl } from "../utils/requests";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
const SalaryScreen = () => {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [dailySalary, setDailySalary] = useState(0);
  const [weeklySalary, setWeeklySalary] = useState(0);

  const getMonthlySalay = async () => {
    await axios
      .get(baseUrl + ":3000/monthlysalary")
      .then((response) => {
        setMonthlySalary(response.data[0].getmonthlyrevenue);
        console.log(response.data[0]);
      })
      .catch((e) => {
        console.log("hata: " + e);
      });
  };

  const getWeeklySalay = async () => {
    await axios
      .get(baseUrl + ":3000/weeklysalary")
      .then((response) => {
        setWeeklySalary(response.data[0].getweeklyrevenue);
      })
      .catch((e) => {
        console.log("hata: " + e);
      });
  };

  const getDailySalay = async () => {
    await axios
      .get(baseUrl + ":3000/dailysalary")
      .then((response) => {
        setDailySalary(response.data[0].sum);
      })
      .catch((e) => {
        console.log("hata: " + e);
      });
  };

  useEffect(() => {
    getMonthlySalay();
    getWeeklySalay();
    getDailySalay();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: hp(3) }}>
        <Text style={{ fontWeight: "bold", fontSize: fp(3) }}>
          Günlük Gelir
        </Text>
        <Text
          style={{ fontWeight: "bold", fontSize: fp(3), marginBottom: hp(2) }}
        >
          <AnimatedCircularProgress
            size={150}
            width={2}
            fill={100}
            tintColor="#00288D"
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="white"
          >
            {(fill) => (
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: fp(3),
                  marginBottom: hp(2),
                }}
              >
                {dailySalary}
              </Text>
            )}
          </AnimatedCircularProgress>
        </Text>
        <Text
          style={{ fontWeight: "bold", fontSize: fp(3), marginBottom: hp(2) }}
        >
          Haftalık Gelir
        </Text>
        <AnimatedCircularProgress
          size={150}
          width={2}
          fill={100}
          tintColor="#00288D"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="white"
        >
          {(fill) => (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: fp(3),
                marginBottom: hp(2),
              }}
            >
              {weeklySalary}
            </Text>
          )}
        </AnimatedCircularProgress>

        <Text style={{ fontWeight: "bold", fontSize: fp(3), marginTop: hp(2) }}>
          Aylık Gelir
        </Text>
        <AnimatedCircularProgress
          size={150}
          width={2}
          fill={100}
          tintColor="#00288D"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="white"
        >
          {(fill) => (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: fp(3),
                marginBottom: hp(2),
              }}
            >
              {monthlySalary}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <TouchableOpacity
        onPress={() => {
          getWeeklySalay();
          getMonthlySalay();
          getDailySalay();
        }}
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

export default SalaryScreen;

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
