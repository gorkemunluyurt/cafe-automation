import { StatusBar } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export const getStatusBarHeight = StatusBar.currentHeight;

export const fp = RFPercentage;

export const wp = widthPercentageToDP;

export const hp = heightPercentageToDP;
