import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MarkerMap from "./MapMarker";
import { Dropdown } from "react-native-element-dropdown";
import Constants from 'expo-constants';

export default function MapScreen() {

  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

    const navigation = useNavigation();
    const [search, setSearch] = useState(0);

    const PlaceTypeName = [
        { label: "Show all places", id: 0 },
        { label: "Province", id: 1 },
        { label: "County", id: 2 },
        { label: "City", id: 3 },
        { label: "Town", id: 4 },
        { label: "Townland", id: 5 },
        { label: "Barony", id: 6 },
        { label: "Street ", id: 7 },
        { label: "Village", id: 8 },
        { label: "River ", id: 9 },
        { label: "Other", id: 10 },
        { label: "Country", id: 11 },
        { label: "Castle", id: 12 },
        { label: "Seignory", id: 13 },
        { label: "Forest", id: 14 },
        { label: "Lake", id: 15 },
      ];

    return (
    <View>
      <MarkerMap filter={search} />
  
        <View style={styles.container}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={PlaceTypeName}
            search
            maxHeight={300}
            labelField="label"
            valueField="id"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={value => {
              setSearch(value.id);
              setIsFocus(false);
            }}/>
        </View>              
    </View>          

    );
}

const styles = StyleSheet.create({
  container: {
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
});