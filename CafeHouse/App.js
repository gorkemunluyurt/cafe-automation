import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAllUsers, login } from "./utils/requests";
import LoginScreen from "./src/Screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/HomeScreen/HomeScreen";
import OrderScreen from "./src/OrderScreen";
import FlashMessage from "react-native-flash-message";
import { getStatusBarHeight } from "./utils/responsive";
import BottomNavigation from "./src/BottomNavigation";
import ProductScreen from "./src/ProductScreen";
import UpdateScreen from "./src/UpdateScreen";
import CreateAccount from "./src/CreateAccount";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Chats</Text>
    </View>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OrderScreen"
          component={OrderScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomNavigation"
          component={BottomNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProductScreen"
          component={ProductScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UpdateScreen"
          component={UpdateScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateAccount"
          component={CreateAccount}
        />
      </Stack.Navigator>
      <FlashMessage statusBarHeight={getStatusBarHeight} position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
