import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Pickup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Pickup</Text>
      </View>
    );
  }
}
export default Pickup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
