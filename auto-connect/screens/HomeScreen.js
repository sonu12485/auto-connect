import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";

class HomeScreen extends Component {
  componentDidMount()
  {
    this.props.fetchUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

export default connect(null, {
  fetchUserDetails
})(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
