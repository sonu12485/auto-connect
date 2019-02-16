import React, { Component } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

import { Input, Button } from 'react-native-elements';

import { connect } from "react-redux";

class A extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      autoNumberModal: false,
      autoNumber: "",
      loading: false
    }
  }

  componentDidMount()
  {
    if(this.props.user.autoNumber === "OD 02AL 5656")
    {
      this.setState({ autoNumberModal: true });
    }
  }

  addAutoNumber = () => {
    alert(this.state.autoNumber);
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

export default connect(mapStateToProps)(A);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
