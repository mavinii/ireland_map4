import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import GetMarkColor from './MarkerColor';

// Map initial location
const INITIAL_POSITION = {
    latitude: 53.419751,
    longitude: -7.76031,
    latitudeDelta: 5.0922,
    longitudeDelta: 5.0921,
  };

const API_PLACES_URL =
  "https://gist.githubusercontent.com/saravanabalagi/541a511eb71c366e0bf3eecbee2dab0a/raw/bb1529d2e5b71fd06760cb030d6e15d6d56c34b3/places.json";
  
// This function gets the places from the API and displays it on the main screen
export default function MarkerMap(props: { filter: any; }){

    // Navigation bewteen screens
    const nav = useNavigation();
    const { filter } = props;
    const [data, setData] = useState([]);
    
    // This fetches the data from the API
    useEffect(() => {
        fetch(API_PLACES_URL)
        .then((res) => res.json())
        .then((markerLocation) => {
            setData(markerLocation);
        });
    }, []);

    return(
        <View>
            {/* This is the Map with inicial position */}
            <MapView 
                style={styles.map} 
                initialRegion={INITIAL_POSITION}>
                    {data.map((marker, index) => {
                        return marker['place_type_id'] === filter || filter === 0 ? (
        
                // This is the marker of the map
                <Marker
                    key={index}
                    coordinate={{ latitude: marker['latitude'], longitude: marker['longitude'] }}
                    pinColor={GetMarkColor(marker['place_type_id'])}>
                        
                    {/* These are the informations that appeared when marker is pressed */}
                    <Callout >
                        <View>
                            <Text style={styles.placeName}>{marker['name']}</Text>
                            <Text style={styles.gaelicPlaceName}>In Gaelic: {marker['gaelic_name'] ? marker['gaelic_name']: 'Not Available'}</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={() => nav.navigate('Details', { 
                                name: marker['name'],
                                gaelic_name: marker['gaelic_name'],
                                marker_type: marker['place_type_id'],
                                latitude: marker['latitude'],
                                longitude: marker['longitude'],
                            })}>
                            <Text style={styles.detailsButton}>Go to Details</Text>
                        </TouchableOpacity>
                    </Callout>
                </Marker>
                ) : null;
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
    detailsButton: {
        fontSize: 13,
        marginTop: 5,
        color: 'blue',
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
});