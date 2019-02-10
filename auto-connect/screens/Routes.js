import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Routes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Routes</Text>
      </View>
    );
  }
}
export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
