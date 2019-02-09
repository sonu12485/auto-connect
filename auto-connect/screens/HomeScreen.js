import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";

import { Ionicons } from '@expo/vector-icons';

import Map from "../components/Map";

class HomeScreen extends Component {
  componentDidMount() {
    this.props.fetchUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.nav} >
          <View>
            {/* <Ionicons name="md-menu" size={32} color="white" /> */}
          </View>
          <View>
            <Text style={styles.navText} >Home</Text>
          </View>
        </View>

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
  },
  nav: {
    width: "100%",
    height: 70,
    backgroundColor: "#273444",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: 10
  },
  navText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  }
});
