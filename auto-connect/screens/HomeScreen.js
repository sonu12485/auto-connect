import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";
import Map from "../components/Map";

class HomeScreen extends Component {
  componentDidMount() {
    this.props.fetchUserDetails();
  }

  render() {
    return <Map />;
  }
}

export default connect(
  null,
  {
    fetchUserDetails
  }
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
