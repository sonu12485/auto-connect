import React, { Component } from "react";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import DashboardStackNavigator from "./DashboardStackNavigator";
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
          </View>
          <ScrollView>
            <DrawerItems {...this.props} />
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
    Home: DashboardStackNavigator
  },
  {
    contentComponent: connect(mapStateToProps)(customDrawerComponent),
    contentOptions: {
      activeTintColor: "rebeccapurple"
    }
  }
);

export default AppDrawerNavigator;
