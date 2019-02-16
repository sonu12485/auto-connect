import React from "react";
import { MapView } from "expo";

import { connect } from "react-redux";

import colors from "../constants/routeColors";

// PROPS: lat,long

class PickupMap extends React.Component {
  renderRoutePolyline = () => {
    if (this.props.route.polyline !== null) {
      return this.props.route.polyline.map((a, index) => {
        return (
          <MapView.Polyline
            coordinates={a}
            strokeWidth={4}
            strokeColor={colors[index]}
          />
        );
      });
    } else {
      return null;
    }
  };

  renderRouteMarkers = () => {
    if (this.props.route.route !== null) {
      return this.props.route.route.map(a => {
        return (
          <MapView.Marker
            coordinate={{
              latitude: a.lat,
              longitude: a.long
            }}
            title={a.name}
          />
        );
      });
    } else {
      return null;
    }
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          // latitude: this.props.lat,
          // longitude: this.props.long,
          latitude: 12.973739,
          longitude: 77.641445,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 12.973739,
            longitude: 77.641445
          }}
          title="Your Location"
        />
        {this.renderRoutePolyline()}
        {this.renderRouteMarkers()}
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(PickupMap);
