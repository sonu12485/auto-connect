import React, { Component } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";

import { fetchUserDetails } from "../actions/userDetails";

import { connect } from "react-redux";

import Map from "../components/Map";

class HomeScreen extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      start: "java",
      end: "js"
    }
  }

  componentDidMount() {
    this.props.fetchUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer} >

        <View>
          <View>
            <Text>Enter start Location</Text>
          </View>
          <View>
            <Picker
              mode="dropdown"
              selectedValue={this.state.start}
              style={{height: 60, width: 300}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({start: itemValue})
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>

        <View>
          <View>
            <Text>Enter end Location</Text>
          </View>
          <View>
            <Picker
              mode="dropdown"
              selectedValue={this.state.end}
              style={{height: 60, width: 300}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({end: itemValue})
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        

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
  inputContainer: {
    marginTop: 20
  }
});
