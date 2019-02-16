import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, AsyncStorage, Picker, Platform } from "react-native";

import { Input, Button } from 'react-native-elements';

import { Constants, Location, Permissions } from "expo";
import Icon from "@expo/vector-icons/Ionicons";
import { fetchUserDetails } from "../actions/userDetails";
import { fetchPlaces } from "../actions/places";
import { fetchRoute } from "../actions/route";

import axios from "axios";
const URL = process.env["BACKEND_URI"];

import { connect } from "react-redux"; 

import Map from "../components/Map";

class DriverRoutes extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      updateCount: 0,
      autoNumberModal: false,
      autoNumber: "",
      loading: false,
      location: null,
      locationErrorMessage: null,
      start: 11,
      end: 1
    }
  }

  componentDidMount()
  {
    this.props.fetchUserDetails(); 
    this.props.fetchPlaces();

    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        locationErrorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidUpdate()
  {
    if(this.props.user.autoNumber === "None" 
    && 
    this.state.autoNumberModal === false
    &&
    this.state.updateCount === 0
    )
    {
      this.setState({
        autoNumberModal: true,
        updateCount: 1
      });
    }
  }

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          locationErrorMessage: "Location access denied"
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } catch (e) {
      console.log(e);
    }
  };

  addAutoNumber = async () => {
    // alert(this.state.autoNumber);
    try
      {
        this.setState({
            loading: true
        });

        const token = await AsyncStorage.getItem("token");

        await axios({
            url: `${URL}autoNumber`,
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            data: {
              autoNumber: this.state.autoNumber,
            }
        });

        this.setState({
          autoNumberModal: false,
          autoNumber: "",
          loading: false
        });

        this.props.fetchUserDetails();

      }
      catch(err)
      {
          console.log("error", err);
      }

      this.setState({
        autoNumberModal: false,
        autoNumber: "",
        loading: false
      });
  }

  renderPlaces = () => {
    if (this.props.places !== null) {
      return this.props.places.map(place => {
        return <Picker.Item label={place.name} value={place.id} />;
      });
    } else {
      return null;
    }
  };

  calculateFare = () => {

    if(this.props.route.route !== null)
    {
      const placesNumber = this.props.route.route.length;
      const lowerCost = placesNumber*15 - 10;
      const higherCost = placesNumber*15 + 10;

      return (
        <Text>Estimated Total Fare - &#8377; {lowerCost} - {higherCost}</Text>
      );
    }
    else
    {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.autoNumberModal}
        >
          <View style={styles.container}> 
              <Text>Enter your auto Number</Text>
              <Input
                placeholder='Enter your auto number'
                onChangeText={(text)=> this.setState({ autoNumber: text })}
                value={this.state.autoNumber}
              />
              <View style={{padding: 20}} >
              <Button
                title="Submit"
                onPress={this.addAutoNumber}
                loading={this.state.loading}
              />
              </View>
          </View>
        </Modal>

        <View style={styles.inputContainer}>
          <View>
            <View>
              <View>
                <Text>Enter start Location</Text>
              </View>
              <View>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.start}
                  style={{ height: 60, width: 300 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ start: itemValue })
                  }
                >
                  {this.renderPlaces()}
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
                  style={{
                    height: 60,
                    width: 300
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ end: itemValue })
                  }
                >
                  {this.renderPlaces()}
                </Picker>
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Icon
              onPress={() => {
                this.props.fetchRoute(
                  this.state.start.toString(),
                  this.state.end.toString()
                );
              }}
              name="md-search"
              size={30}
              style={{}}
            />
          </View>
        </View>
        <View style={styles.mapContainer}>
          <Map
            lat={
              this.state.location && Number(this.state.location.coords.latitude)
            }
            long={
              this.state.location &&
              Number(this.state.location.coords.longitude)
            }
          />
        </View>
        <View style={{ padding: 10 }} >
            {this.calculateFare()}
        </View>

      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    places: state.places,
    route: state.route
  }
}

export default connect(mapStateToProps, {
  fetchUserDetails,
  fetchPlaces,
  fetchRoute
})(DriverRoutes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  mapContainer: {
    height: 430,
    width: "100%"
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});