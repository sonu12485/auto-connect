import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarCodeScanner, Permissions } from 'expo';

import { storeQRCodeData } from "../actions/qrCode";

import { connect } from "react-redux";

class Pay extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      hasCameraPermission: null
    }
  }

  async componentDidMount() 
  {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    this.props.storeQRCodeData(data);
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={{
            height: Dimensions.get('window').height/2,
            width: Dimensions.get('window').width/2,
          }}
        />
      </View>
    );
  }
}

export default connect(null, {
  storeQRCodeData
})(Pay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
