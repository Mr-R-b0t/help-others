import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Lottie from 'lottie-react-native';
import { Animated, Easing } from 'react-native';

 
export default function App() {
    
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Help Others</Text>
      <StatusBar style="auto" />
      
        <Lottie
          style={styles.animation}
          source={require('./assets/animation.json')}
          autoPlay
          loop
          
        /> 
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

  lottie: {
    width: 100,
    height: 100,
  },

  animationContainer: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },


});
