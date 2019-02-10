import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class LiveAutos extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LiveAutos</Text>
      </View>
    );
  }
}
export default LiveAutos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
