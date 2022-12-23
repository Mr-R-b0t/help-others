import { View, Image, TextInput,  TouchableOpacity,  Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDownIcon, MagnifyingGlassIcon,  Cog6ToothIcon, MapIcon } from "react-native-heroicons/outline"
import LottieView from 'lottie-react-native';

import { useEffect } from 'react';
import * as Location from "expo-location";


import { appwriteClient } from '../src/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import {Store} from '../redux/store';

import { ListItem } from '@rneui/base';
import { TouchableWithoutFeedback } from 'react-native';



const HomeSceen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const Profile =  async () => {     
    if(user) {  
    navigation.navigate('Profile')
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View className="flex-1 bg-white">
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
          <TouchableOpacity onPress={() => navigation.navigate('account')}>
          <Image source={{ uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" }} className=" h-7 w-7 bg-gray-300 p-4 rounded-full" />
        </TouchableOpacity>
        <View className="flex-1 mx-1">
        <Text className="font-bold text-3xl">Help Others<ChevronDownIcon size={20} className="ml-2"/></Text>
        </View>
        <MapIcon className="ml-2 py-5" size={35} onPress={() => navigation.navigate('Map')}/>
        <Cog6ToothIcon size={35} className="ml-2" onPress={() => navigation.navigate('Settings')} />
      </View>
       
      <View className="flex-row justify-center pt-12">
          <TouchableWithoutFeedback /*onPress={}*/>
      <LottieView source={require('../assets/lottie/helping-humans.json')} autoPlay loop
          style={{ width: 250, height: 250, alignSelf: 'center' }}  />
      </TouchableWithoutFeedback>
      </View>
        <View className="flex-row justify-center pt-20 py-20">
          <TouchableOpacity className="bg-blue-500 rounded-3xl py-2 px-10 text-white text-center">
            <Text className="font-bold mx-2 py-2  items-center text-7xl">S O S</Text>
          </TouchableOpacity>
        </View>
     
       
    </SafeAreaView>
    </View>
  );
};

export default HomeSceen