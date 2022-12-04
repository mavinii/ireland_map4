import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';

// importing Maps
import MapView, { Callout, Marker } from 'react-native-maps';

// importing the color for Markers
import GetMarkColor from '../components/MarkColor';

// Map initial location
const INITIAL_POSITION = {
    latitude: 53.419751,
    longitude: -7.76031,
    latitudeDelta: 5.0922,
    longitudeDelta: 5.0921,
  };

// Dropdown options
const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

// Home Screen
export default function HomeScreen({ navigation }) {

    // State for the dropdown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Dropdown label
            </Text>
          );
        }
        return null;
    };

    
    // Marker position and Map position
    const [data1, setPlaceMarkers] = useState([]);
    const [data2, setPlaceTypes] = useState([]);

    // Places API and Places Types API
    useEffect(() => {
        Promise.all([
        fetch('https://gist.githubusercontent.com/saravanabalagi/541a511eb71c366e0bf3eecbee2dab0a/raw/bb1529d2e5b71fd06760cb030d6e15d6d56c34b3/places.json'),
        fetch('https://gist.githubusercontent.com/saravanabalagi/541a511eb71c366e0bf3eecbee2dab0a/raw/bb1529d2e5b71fd06760cb030d6e15d6d56c34b3/place_types.json'),
        ])
        .then(([dataMarkers, dataPlaceTypes]) => 
        Promise.all([dataMarkers.json(), dataPlaceTypes.json()])
        )
        .then(([data1, data2]) => {
        setPlaceMarkers(data1);
        setPlaceTypes(data2);
        });
    }, []);

    // function that returns the place type
    function getPlacesTypeName(place_type_id: number) {
        return data2[place_type_id];
    }

    return (
        
        // This is the Map with inicial position
        <MapView 
        style={styles.map} 
        initialRegion={INITIAL_POSITION}>
            {data1.map((marker, index) => (
    
            // This is the marker of the map
            <Marker
              key={index}
              coordinate={{ latitude: marker['latitude'], longitude: marker['longitude'] }}
              pinColor={GetMarkColor(marker['place_type_id'])}>
                
                {/* These are the informations that appeared when marker is pressed */}
                <Callout>
                    <View>
                        <Text style={styles.placeName}>{marker['name']}</Text>
                        <Text style={styles.gaelicPlaceName}>In Gaelic: {marker['gaelic_name'] ? marker['gaelic_name']: 'Not Available'}</Text>
                        <Text style={styles.addressPlaceName}>Place: {getPlacesTypeName(marker['place_type_id'])?.['name']}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Details', { 
                            name: marker['name'],
                            gaelic_name: marker['gaelic_name'],
                            latitude: marker['latitude'],
                            longitude: marker['longitude'],
                        })}>
                        <Text style={styles.detailsButton}>Details</Text>
                    </TouchableOpacity>
                </Callout>
            </Marker>
            ))}
        </MapView>
    );
}  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },    
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    placeName: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    gaelicPlaceName: {
        fontSize: 15,
        marginBottom: 5,
    },
    addressPlaceName: {
        fontSize: 15,
        marginBottom: 5,
    },
    detailsButton: {
      fontSize: 13,
      marginTop: 5,
      color: 'blue',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
  });