import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.loadApp();
  }

  loadApp = async () => {
    const token = await AsyncStorage.getItem("token");
    const expiresIn = await AsyncStorage.getItem("expiresIn");

    if(Date.now() < Number(expiresIn) && token)
    {
      this.props.navigation.navigate("Main");
    }
    else
    {
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
export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
