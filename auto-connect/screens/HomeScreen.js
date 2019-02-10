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
    return (
      <View style={styles.container}>
        <View>
          <Text>HomeScreen</Text>
        </View>
        <View style={styles.mapContainer} >
          <Map />
        </View>
      </View>
    );
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
    justifyContent: "flex-start"
  },
  mapContainer: {
    height: 500,
    width: "100%"
  }
});
