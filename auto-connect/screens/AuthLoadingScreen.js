import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";

import { login } from "../actions/auth";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.loadApp();
  }

  componentDidMount() {}
  loadApp = async () => {
    const token = await AsyncStorage.getItem("token");
    const expiresIn = await AsyncStorage.getItem("expiresIn");

    if (Date.now() < Number(expiresIn) && token) {

      // if (user.type === "user") this.props.navigation.navigate("Main");
      // else this.props.navigation.navigate("MainDriver");
      
    } else {
      this.props.navigation.navigate("Welcome");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    login
  }
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
