import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated} from 'react-native';
import Lottie from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from "react";

 


 
export default function App() {
    
  

return (

 
  <View style={styles.container}>
    <Text style={styles.title}>Help Others</Text>
    <Lottie
      style={styles.animation}
      source={require('./assets/loading.json')}
      autoPlay
      loop />
  </View>
 
 

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e61f09',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  title: {
    fontSize: 70,
    fontWeight: 'bold',
  },

  animation: {
    width: 200,
    height: 200,
  }
});



