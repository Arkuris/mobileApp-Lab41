import React from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const MapViewComponent = ({ region }) => {
  return (
    <MapView 
      style={{ width: Dimensions.get('window').width, height: 300 }}
      region={region}
    />
  );
};

export default MapViewComponent;
