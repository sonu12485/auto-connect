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
      >
        <MapView.Marker
          coordinate={{
            latitude: this.props.lat ? this.props.lat : 0,
            longitude: this.props.long ? this.props.long : 0
          }}
          title="Your Location"
        />
      </MapView>
    );
  }
}

export default Map;
