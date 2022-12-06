import * as React from 'react';
import { StyleSheet, View } from 'react-native';

// importing Maps
import MapScreen from '../components/MapScreen';

// Home Screen
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <MapScreen />
        </View>
    );
}

// Home Screen Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});