import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import GetMarkColor from './MarkColor';

// Map initial location
const INITIAL_POSITION = {
    latitude: 53.419751,
    longitude: -7.76031,
    latitudeDelta: 5.0922,
    longitudeDelta: 5.0921,
  };
  
export default function MarkerMap(){

    // Navigation bewteen screens
    const nav = useNavigation();

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

    return(

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
                        onPress={() => nav.navigate('Details', { 
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
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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