import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class MainDriverScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MainDriverScreen</Text>
      </View>
    );
  }
}
export default MainDriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
