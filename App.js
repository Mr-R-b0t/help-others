import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from "nativewind";
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
import Map from './screens/MapScreen';
import SignUp from './screens/SignUpScreen';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
      
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Sign" component={SignUp} />
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
