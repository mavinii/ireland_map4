import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// importing the bottom tabs
import BottomTabs from './navigation/Tab';

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  )
}