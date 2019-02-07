import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { Google } from 'expo';

class WelcomeScreen extends Component {

  constructor(props)
  {
    super(props);

    this.state={
      signedIn: false, 
      name: "", 
      photoUrl: ""
    }
  }

  signIn = async () => {

    console.log(process.env["GOOGLE_OAUTH_CLIENT_ID"]);

    try {
      const result = await Google.logInAsync({
        androidClientId: process.env['GOOGLE_OAUTH_CLIENT_ID'],
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }

    } catch (e) {
      console.log("error", e)
    }

  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text>WelcomeScreen</Text>
        <View>
          <View style={{ padding: 10 }} >
          <Button
            onPress={this.signIn}
            title="SignIn as User"
          />
          </View>
          <View style={{ padding: 10 }} >
          <Button
            onPress={this.signIn}
            title="SignIn as Auto Driver"
          />
          </View>
        </View>
      </View>
    );
  }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
