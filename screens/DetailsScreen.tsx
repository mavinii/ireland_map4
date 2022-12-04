import * as React from 'react';
import { View, Text, Button } from 'react-native';

// Details Screen
export default function DetailsScreen({ route, navigation }) {
    
    // 2. Get the param from the home screen
    const { itemId, otherParam } = route.params;
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen with Tabs</Text>
  
          {/* displaying the params got from the home screen */}
          <Text>itemId: {JSON.stringify(itemId)}</Text>
          <Text>otherParam: {JSON.stringify(otherParam)}</Text>
  
          <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}