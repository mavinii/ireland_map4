import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from "react";

// importing Maps
import MapView, { Callout, Marker } from 'react-native-maps';

// importing the color for Markers
import GetMarkColor from '../components/MarkColor';

import MarkerMap from '../components/MarkerMap';

import DropdownComponent from '../components/DropdownComponent';

// Map initial location
const INITIAL_POSITION = {
    latitude: 53.419751,
    longitude: -7.76031,
    latitudeDelta: 5.0922,
    longitudeDelta: 5.0921,
  };

// Home Screen
export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <MarkerMap />
            <DropdownComponent />
        </View>
    );
}  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },    
});