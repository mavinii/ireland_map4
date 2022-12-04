import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons for the bottom tabs
import Ionicons from 'react-native-vector-icons/Ionicons';

// importing the home screeb tabs
import HomeScreen from '../screens/HomeScreen';

// importing the details screeb tabs
import DetailsScreen from '../screens/DetailsScreen';

// This enables the bottom tabs
const Tab = createBottomTabNavigator();

// Bottom Tabs
export default function BottomTabs() {
    return (
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
    )
}