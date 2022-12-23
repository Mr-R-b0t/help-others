import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View, Text } from "react-native";

//Screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Map from "./screens/MapScreen";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUpScreen";
import Login from "./screens/LoginScreen";
import test from "./screens/test";
import accountScreen from "./screens/profile_screen";
import uploadImage from "./screens/uploadImage";
import accountCreated from "./screens/accountCreated";

//import { connect } from 'react-redux';
//import { setUser } from './redux/actions';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

function App() {
  /*const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      
      setAppIsReady(true)


    );
  } */

  return (
    <Provider store={Store}>
      <NavigationContainer
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Sign" component={SignUp} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="test" component={test} />
          <Stack.Screen name="account" component={accountScreen} />
          <Stack.Screen name="upload" component={uploadImage} />
          <Stack.Screen name="accountCreated" component={accountCreated} />
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
