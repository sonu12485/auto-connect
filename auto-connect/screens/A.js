import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class A extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>A</Text>
      </View>
    );
  }
}
export default A;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
