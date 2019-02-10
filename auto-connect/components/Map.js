import React from "react";
import { MapView } from "expo";

// PROPS: lat,long

class Map extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.lat,
          longitude: this.props.long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      />
    );
  }
}

export default Map;
