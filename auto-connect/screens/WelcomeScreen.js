import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "react-native-elements";

import { Google } from "expo";

import { connect } from "react-redux";

import { loginUser, loginDriver } from "../actions/auth";

import Toast from "react-native-simple-toast";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingUser: false,
      loadingDriver: false
    };
  }

  signInUser = async () => {
    this.setState({
      loadingUser: true
    });

    try {
      const result = await Google.logInAsync({
        androidClientId: process.env["GOOGLE_OAUTH_CLIENT_ID"],
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.props.loginUser(
          result.user.name,
          result.user.email,
          result.user.photoUrl,
          "user"
        );
      } else {
        Toast.show("Google login interrupted");

        this.setState({
          loadingUser: false
        });
      }
    } catch (e) {
      Toast.show("Google login interrupted");

      this.setState({
        loadingUser: false
      });
    }
  };

  signInDriver = async () => {
    this.setState({
      loadingDriver: true
    });

    try {
      const result = await Google.logInAsync({
        androidClientId: process.env["GOOGLE_OAUTH_CLIENT_ID"],
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.props.loginDriver(
          result.user.name,
          result.user.email,
          result.user.photoUrl,
          "driver"
        );
      } else {
        Toast.show("Google login interrupted");

        this.setState({
          loadingDriver: false
        });
      }
    } catch (e) {
      Toast.show("Google login interrupted");

      this.setState({
        loadingDriver: false
      });
    }
  };

  componentDidUpdate() {
    if (this.props.user.loggedIn) {
      this.setState({
        loadingUser: false,
        loadingDriver: false
      });

      if (this.props.user.type === "user") {
        this.props.navigation.navigate("Main");
      } else {
        this.props.navigation.navigate("MainDriver");
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>WelcomeScreen</Text>
        <View>
          <View style={{ padding: 10 }}>
            <Button
              title="SignIn as User"
              onPress={this.signInUser}
              loading={this.state.loadingUser}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Button
              onPress={this.signInDriver}
              title="SignIn as Auto Driver"
              loading={this.state.loadingDriver}
            />
          </View>
        </View>
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
    loginUser,
    loginDriver
  }
)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
