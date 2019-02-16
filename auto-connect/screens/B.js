import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class B extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>B</Text>
      </View>
    );
  }
}
export default B;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
