import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import MarkerMap from '../components/MarkerMap';

import DropdownComponent from '../components/DropdownComponent';

// Home Screen
export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <MarkerMap />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});