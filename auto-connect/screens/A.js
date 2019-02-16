import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, AsyncStorage } from "react-native";

import { Input, Button } from 'react-native-elements';

import { fetchUserDetails } from "../actions/userDetails";

import axios from "axios";
const URL = process.env["BACKEND_URI"];

import { connect } from "react-redux"; 

class A extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      updateCount: 0,
      autoNumberModal: false,
      autoNumber: "",
      loading: false
    }
  }

  componentDidMount()
  {
    this.props.fetchUserDetails(); 
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
        <Text>A</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  fetchUserDetails
})(A);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
