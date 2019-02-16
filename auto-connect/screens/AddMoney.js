import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";

import { Input, Button } from 'react-native-elements';

import axios from "axios";
const URL = process.env["BACKEND_URI"];

class FinalPay extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      amount: 0,
      loading: false
    }
  }

  addMoney = async () => {
      try
      {
        this.setState({
            loading: true
        });

        const token = await AsyncStorage.getItem("token");

        const result = await axios({
            url: `${URL}addMoney`,
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            data: {
                amount: this.state.amount
            }
        });

        this.setState({
            amount: 0,
            loading: false
        });

        alert("Money transfer done!");

        this.props.navigation.navigate("Main");
      }
      catch(err)
      {
          console.log("error", err);
      }

      this.setState({
          amount: 0,
          loading: false
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Money</Text>
        <Input
            placeholder='Enter amount of money to be added'
            keyboardType='numeric'
            onChangeText={(text)=> this.setState({ amount: text })}
            value={this.state.amount}
        />
        <View style={{padding: 20}} >
        <Button
            title="Add Money"
            onPress={this.addMoney}
        />
        </View>
      </View>
    );
  }
}

export default FinalPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
