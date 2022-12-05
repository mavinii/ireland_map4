import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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

export default function DropdownComponent() {

    // Navigation bewteen screens
    const nav = useNavigation();

    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

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
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select a place' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />

        {/* TODO: Display the API name and local to the details screen */}
        <View>
          <TouchableOpacity 
            onPress={() => nav.navigate('Details', {
              label: data[value - 1].label,
              value: data[value - 1].value,
            })}>
            <Text style={styles.detailsButton}>Go to Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: '90%',
      top: Constants.statusBarHeight,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.30,
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
    detailsButton: {
      fontSize: 13,
      marginTop: 7,
      color: 'blue',
    },
  });