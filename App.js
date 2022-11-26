import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeWindStyleSheet } from "nativewind";
import Location from  'expo-location';
import { useEffect } from 'react';
import {Provider} from 'react-redux';
import {Store} from './redux/store';





import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import Map from './screens/MapScreen';
import Profile from './screens/Profile';
import SignUp from './screens/SignUpScreen';
import Login from './screens/LoginScreen';
import test from './screens/test'



//import { connect } from 'react-redux';
//import { setUser } from './redux/actions';



NativeWindStyleSheet.setOutput({
  default: "native",
});



const Stack = createNativeStackNavigator();

function App() {
 

    return (
    <Provider store={Store}>
    <NavigationContainer
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
      
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Sign" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="test" component={test}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
}
//const mapState = (state) => ({
// user: state.user, 
//})


//const mapDispatch = (dispatch) => ({
//  setUser: (user) => dispatch(setUser(user)),

//})
//export default connect(mapState, mapDispatch)(App);

export default App;

