import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Pay extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Pay</Text>
      </View>
    );
  }
}

export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
