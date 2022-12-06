import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import GetMarkColor from './MarkColor';
import { Dropdown } from 'react-native-element-dropdown';
import Constants from 'expo-constants';

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

    // DropDown value
    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false); 

    return(
        <View>
            <View style={styles.searchContainer}>            
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data2}
                    search
                    value={value}
                    placeholder={!isFocus ? 'Select a place type' : '...'}
                    onChange={(value) => setValue(value)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)} labelField={''} valueField={''} />
            </View>


            {/* This is the Map with inicial position */}
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
                    <Callout >
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
                            <Text style={styles.detailsButton}>Go to Details</Text>
                        </TouchableOpacity>
                    </Callout>
                </Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: Constants.statusBarHeight + 45,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,        
        padding: 8,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
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
    addressPlaceName: {
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