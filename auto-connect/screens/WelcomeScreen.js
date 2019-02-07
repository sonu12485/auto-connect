import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>WelcomeScreen</Text>
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
