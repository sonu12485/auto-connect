import React from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import HomeScreen from "../screens/HomeScreen";

const customDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1, marginTop: 25, backgroundColor: "#eee" }}>
    <View style={{}}>
      <Image
        source={{ uri: "https://img.icons8.com/color/180/avatar.png" }}
        style={{ height: 120, width: 120, borderRadius: 60 }}
      />
      <Text style={{ fontSize: 20, padding: 10 }}>Soumya Ranjan Mohanty</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen
  },
  {
    contentComponent: customDrawerComponent,
    contentOptions: {
      activeTintColor: "rebeccapurple"
    }
  }
);

export default AppDrawerNavigator;
