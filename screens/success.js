import { View, Text, TouchableOpacity, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native-maps';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const success = () => {

     /* const animationProgress = useRef(new Animated.Value(0));

     useEffect(() => {
       Animated.timing(animationProgress.current, {
         toValue: 1,
         duration: 5000,
         easing: Easing.linear,
         useNativeDriver: false,
       }).start();
     }, []); */

     const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  return (
    <SafeAreaView className="flex items-center">
      <View className="flex">
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LottieView
            source={require("../assets/lottie/success.json")}
            /*  progress={animationProgress.current} */
            autoPlay
            style={{
              width: 175,
              height: 175,
              alignSelf: "center",
              marginTop: -15,
            }}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default success