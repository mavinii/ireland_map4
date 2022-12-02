import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons for the bottom tabs
import Ionicons from 'react-native-vector-icons/Ionicons';


// Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home with Tabs</Text>

      <Button
        title="Go to Details"
        onPress={() => {

          // 1. Navigate to the Details route with params
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />      
    </View>
  );
}


// Details Screen
function DetailsScreen({ route, navigation }) {
  
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

// FIXME: Fix the back button on the details screen
// This enables the back button on the header, do this for all screens 
// const HomeStack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       <HomeStack.Screen name="Details" component={DetailsScreen} />
//     </HomeStack.Navigator>
//   );
// }

// This enables the back button on the header, do this for all screens
// const DetailsStack = createNativeStackNavigator();

// function DetailsStackScreen() {
//   return (
//     <DetailsStack.Navigator>
//       <DetailsStack.Screen name="Home" component={HomeScreen} />
//       <DetailsStack.Screen name="Details" component={DetailsScreen} />
//     </DetailsStack.Navigator>
//   );
// }


// This enables the bottom tabs
const Tab = createBottomTabNavigator();

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator

        // Tab bar with icons and color 
        screenOptions={({ route, },) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'location'
                : 'location';
            } else if (route.name === 'Details') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })} >

        {/* Tabs and Title on Top */}
        <Tab.Screen name="Home" component={ HomeScreen } options={{ title: 'Éire Historical Map' }} />
        <Tab.Screen name="Details" component={ DetailsScreen } options={{ title: 'Details Map' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}