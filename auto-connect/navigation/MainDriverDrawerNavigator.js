import React, { Component } from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import DriverDashboardStackNavigator from "./DriverDashboardStackNavigator";
import QRCodeDisplayScreen from "../screens/QRCodeDisplay";
import { connect } from "react-redux";

class customDrawerComponent extends Component {
  render() {
    if (this.props.user.loggedIn) {
      return (
        <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
          <View
            style={{
              marginTop: 20
            }}
          >
            <View style={{ padding: 20 }}>
              <Image
                source={{ uri: this.props.user.profilePic }}
                style={{ height: 120, width: 120, borderRadius: 60 }}
              />
            </View>
            <Text style={{ fontSize: 20, padding: 10 }}>
              {this.props.user.name}
            </Text>
            <Text style={{ padding: 10 }} >
              Balance - &#8377; {this.props.user.balance}
            </Text>
            <Text style={{ padding: 10 }} >
              Auto Number - {this.props.user.autoNumber}
            </Text>
          </View>
          <ScrollView>
            <DrawerItems {...this.props} />
            <TouchableOpacity onPress={async () => {
              await AsyncStorage.clear();
              this.props.navigation.navigate("AuthLoading");
            }} 
            style={styles.logoutContainer}
            >
              <View>
                <Icon name="md-log-out" size={30} />
              </View>
              <View>
                <Text style={styles.drawerElements}>{"     "}Log Out</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: DriverDashboardStackNavigator,
    QRCodeDisplay: QRCodeDisplayScreen
  },
  {
    contentComponent: connect(mapStateToProps)(customDrawerComponent),
    contentOptions: {
      activeTintColor: "rebeccapurple"
    }
  }
);

export default AppDrawerNavigator;

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15
  },
  drawerElements: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 15,
    color: "#273444"
  }
});
