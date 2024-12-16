import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fp, hp, wp } from "../../utils/responsive";
import { useAtomValue } from "jotai";
import { userAtom } from "../../utils/atoms";
import Ionicons from "@expo/vector-icons/Ionicons";
const PersonItem = ({
  name,
  location,
  lastActivity,
  photoUrl,
  battery,
  onPress = () => {},
  onRemovePress = () => {},
  useInterval = false,
}) => {
  const user = useAtomValue(userAtom);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.nonPhotoView}>
        <Text style={styles.nonPhotoText}>{name[0]}</Text>
      </View>
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text numberOfLines={1} style={styles.locationText}>
          Yetki Düzeyi: {location}
        </Text>
        <Text style={styles.lastActivityText}>
          işe başlama tarihi: {lastActivity}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default PersonItem;

const styles = StyleSheet.create({
  container: {
    width: wp(95),
    flexDirection: "row",
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#ECEBF0",
    alignSelf: "center",
  },
  nonPhotoView: {
    backgroundColor: "#F0F0F0",
    width: wp(12),
    height: wp(12),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(7.5),
    borderWidth: 2,
    borderColor: "#DFDFDF",
    marginRight: wp(2),
    overflow: "hidden",
  },
  nonPhotoText: {
    color: "#02004C",
    margin: wp(2),
    fontSize: fp(2.5),
  },
  nameText: {
    color: "#02004C",
    fontSize: fp(2),
  },
  locationText: {
    color: "#02004C",
    fontSize: fp(2),
    width: wp(60),
  },
  lastActivityText: {
    color: "#02004C",
    fontSize: fp(1.6),
  },
});
