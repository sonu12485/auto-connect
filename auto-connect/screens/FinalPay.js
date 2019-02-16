import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { connect } from "react-redux";

class FinalPay extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      amount: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Final Pay {this.props.qrCode}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
    return {
        qrCode: state.qrCode
    };
};

export default connect(mapStateToProps)(FinalPay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
