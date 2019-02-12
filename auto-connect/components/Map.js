import React from "react";
import { MapView } from "expo";

import { connect } from "react-redux";

// PROPS: lat,long

class Map extends React.Component {

  renderPolyline = () => {

    if(this.props.route.polyline !== null)
    {
      return (
        <MapView.Polyline
          coordinates={this.props.route.polyline}
          strokeWidth={4}
          strokeColor="rgba(255,140,0,0.8)"
        />
      );
    }
    else
    {
      return null;  
    }
  }

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
            latitude: this.props.lat ? this.props.lat : 0,
            longitude: this.props.long ? this.props.long : 0
          }}
          title="Your Location"
        />
        {this.renderPolyline()}
      </MapView>
    );
  }
}

const mapStateToProps = state => {
  return {
    route: state.route
  };
};

export default connect(mapStateToProps)(Map);
