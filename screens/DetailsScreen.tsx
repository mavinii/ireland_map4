import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

// Details Screen
export default function DetailsScreen( { route, navigation } ) {
    
    // Get the param from the home screen
    const {name, gaelic_name,  marker_type, latitude, longitude } = route.params;
  
    return (
      <View>
        <Image 
          source={{ uri: `https://picsum.photos/id/${Math.floor(Math.random() * 10)}/200/300` }}
          style={style.placeImage} />

        <Text style={style.placeName}>Name: {name}</Text>
        <Text style={style.gaelicName}>Gaelic Name: {gaelic_name}</Text>
        <Text style={style.placeType}>Place Type: {marker_type}</Text>
        <Text style={style.latitude}>Latitude: {latitude}</Text>
        <Text style={style.longitude}>Longitude: {longitude}</Text>

        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
    );
}

const style = StyleSheet.create({
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gaelicName: {
    fontSize: 15,
    marginBottom: 5,
  },
  placeType: {
    fontSize: 15,
    marginBottom: 5,
  },
  latitude: {
    fontSize: 15,
    marginBottom: 5,
  },
  longitude: {
    fontSize: 15,
    marginBottom: 5,
  }  
});