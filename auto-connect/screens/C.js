import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class C extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>C</Text>
      </View>
    );
  }
}
export default C;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
