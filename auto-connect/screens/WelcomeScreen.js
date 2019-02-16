import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "react-native-elements";

import { Google } from "expo";

import { connect } from "react-redux";

import { login } from "../actions/auth";

import Toast from "react-native-simple-toast";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  signIn = async () => {
    this.setState({
      loading: true
    });

    try {
      const result = await Google.logInAsync({
        androidClientId: process.env["GOOGLE_OAUTH_CLIENT_ID"],
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.props.login(
          result.user.name,
          result.user.email,
          result.user.photoUrl
        );
      } else {
        Toast.show("Google login interrupted");

        this.setState({
          loading: false
        });
      }
    } catch (e) {
      Toast.show("Google login interrupted");

      this.setState({
        loading: false
      });
    }
  };

  componentDidUpdate() {
    if (this.props.user.loggedIn) {
      this.setState({
        loading: false
      });

      this.props.navigation.navigate("Main");
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
              onPress={this.signIn}
              loading={this.state.loading}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Button
              onPress={_ => {
                console.log("Driver SignIn");
              }}
              title="SignIn as Auto Driver"
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
    login
  }
)(WelcomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
